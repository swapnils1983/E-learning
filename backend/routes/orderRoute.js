const express = require("express");
const {
    createOrder,
    capturePaymentAndFinalizeOrder,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/create", createOrder);
router.post("/capture", capturePaymentAndFinalizeOrder);

module.exports = router;