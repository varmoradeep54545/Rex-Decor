const mongoose = require('mongoose');
const Order = require('../models/Order');

const saveOrder = async (req, res) => {
  const { userId, products, razorpay_order_id, razorpay_payment_id, razorpay_signature, totalAmount } = req.body;

  try {
    console.log('Received order data:', req.body);

    // Validate required fields
    if (!userId || !products || !razorpay_order_id || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const newOrder = new Order({
      userId: userObjectId,
      products,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      totalAmount
    });

    // Save order to the database
    const savedOrder = await newOrder.save();
    console.log('Order saved:', savedOrder);
    res.status(201).json({ message: 'Order saved successfully', order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Error saving order', details: error.message });
  }
};
const getOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      console.log('Orders retrieved:', orders);
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ error: 'Error retrieving orders', details: error.message });
    }
  };

  module.exports = { saveOrder, getOrders };
