const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contact'); 
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const profileRoutes = require('./routes/profile');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', paymentRoutes);
app.use('/api/profile', profileRoutes);

const startServer = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://patelmarks680:EP71ZH02DNBSgeAh@rex-decor.1wxpj.mongodb.net/?retryWrites=true&w=majority&appName=Rex-Decor', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

startServer();
