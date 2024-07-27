const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact');
const cartRoutes = require('./routes/cart');
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/order'); 
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();  // Add this at the top of your server file
const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/razorpay', paymentRoutes);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

startServer();
