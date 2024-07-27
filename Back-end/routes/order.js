const express = require('express');
const router = express.Router();
const { saveOrder, getOrders } = require('../controllers/orderController');

// Route to handle saving an order
router.post('/order-success', saveOrder);

// Route to fetch all orders
router.get('/orders', getOrders);

module.exports = router;
