const jwt = require('jsonwebtoken');

const verifyToken = (token, secretKey) => {
    return jwt.verify(token, secretKey);
};

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: 'User is not authenticated!',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = verifyToken(token, 'JWT_SECRET');
        req.user = payload;
        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Invalid or expired token!',
        });
    }
};

module.exports = authenticate;
