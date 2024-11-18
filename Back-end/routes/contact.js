// routes/contact.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST route for handling form submissions
router.post('/contact', async (req, res) => {
  const { username, email, message } = req.body;

  // Simple validation
  if (!username || !email || !message) {
    return res.status(400).json({ msg: 'Please fill in all fields' });
  }

  try {
    const newContact = new Contact({
      username,
      email,
      message,
    });

    // Save the contact message to the database
    await newContact.save();
    res.status(201).json({ msg: 'Your message has been submitted!' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
