import axiosInstance from "@/api/axiosInstance";
import { createContext } from "react"
import { useState, useEffect } from "react";


export const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        authenticate: false,
        user: null
    });

    async function handleRegisterUser(formData) {
        try {
            const { data } = await axiosInstance.post('/auth/register', {
                ...formData,

            })
            return data;
        } catch (error) {
            return error.response?.data || { success: false, message: "Something went wrong" };

        }
    }

    async function handleLoginUser(formData) {
        try {
            const { data } = await axiosInstance.post('/auth/login', {
                ...formData
            })

            if (data.success) {
                sessionStorage.setItem('accessToken', JSON.stringify(data.accessToken))
                setAuth({
                    authenticate: true,
                    user: data.user
                })
            }
            else {
                setAuth({
                    authenticate: false,
                    user: null
                })
            }
            return data;
        }
        catch (error) {
            return error.response?.data || { success: false, message: "Something went wrong" };
        }
    }

    async function checkAuth() {
        const { data } = await axiosInstance.get('/auth/check-auth');
        return data;
    }

    async function checkAuthUser() {
        const data = await checkAuth();
        if (data.success) {
            setAuth({
                authenticate: true,
                user: data.data.user
            })
        }
        else {
            setAuth({
                authenticate: false,
                user: null
            })
        }
    }

    useEffect(() => {
        checkAuthUser()
    }, [])
    return <AuthContext.Provider value={{
        auth,
        setAuth,
        handleRegisterUser,
        handleLoginUser,
        checkAuth,
        checkAuthUser
    }}>
        {children}
    </AuthContext.Provider>
}