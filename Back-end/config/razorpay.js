// config/razorpay.js
const Razorpay = require('razorpay');

// Your Razorpay API credentials (replace with your keys)
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_e5wgNQ5IiRmx82',  // Replace with your Razorpay key ID
  key_secret: 'lM6OCJ0I0iALkIrvY11k4jUR'  // Replace with your Razorpay key secret
});

module.exports = razorpayInstance;
