// server/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

// Load environment variables
require("dotenv").config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.REACT_APP_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // amount in the smallest currency unit
      currency,
      receipt,
    };
    const order = await razorpay.orders.create(options);
    console.log("order creating successfully", order);
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay Order Creation Error:", error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

module.exports = router;
