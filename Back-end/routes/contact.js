const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

// Route to handle contact form submission
router.post('/submit', async (req, res) => {
  const { username, email, message } = req.body;

  if (!username || !email || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const newMessage = new ContactMessage({ username, email, message });
    await newMessage.save();
    res.status(200).json({ msg: 'Successfully submit' });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
