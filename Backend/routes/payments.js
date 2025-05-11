const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create Razorpay order
router.post("/order", paymentController.createOrder);

// Validate Razorpay payment signature
router.post("/validate", paymentController.validatePayment);

module.exports = router;
