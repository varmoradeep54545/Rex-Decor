const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming you have an Order model
const razorpayInstance = require('../config/razorpay');
const User = require('../models/User');


// Route to create Razorpay order
router.post('/create-order', async (req, res) => {
  const { amount, currency, receipt } = req.body;

  if (!amount || !currency || !receipt) {
    return res.status(400).json({ msg: 'Please provide all required fields: amount, currency, and receipt.' });
  }

  try {
    const options = {
      amount: amount * 100,  // Amount in paise
      currency: currency,
      receipt: receipt,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ msg: 'Failed to create Razorpay order' });
  }
});

// Route to save the order details in MongoDB
router.post('/save-order', async (req, res) => {
  const {
    userId,
    email,
    phone,
    name,
    address,
    city,
    country,
    postal,
    totalAmount,
    items,
    razorpay_order_id,
    razorpay_payment_id,
  } = req.body;

  try {
    const newOrder = new Order({
      userId,
      email,
      phone,
      name,
      address,
      city,
      country,
      postal,
      totalAmount,
      items,
      razorpay_order_id,
      razorpay_payment_id,
      
    });

    await newOrder.save();
    res.status(201).json({ msg: 'Order saved successfully' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ msg: 'Failed to save order' });
  }
});



router.get('/orders/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await Order.find({ userId }); // Filter orders by userId
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
});






module.exports = router;
