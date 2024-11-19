// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { v4: uuidv4 } = require("uuid"); // UUID generator for userId
const bcrypt = require('bcryptjs');
const { generateToken } = require("../jwt");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user with hashed password and unique userId
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userId: uuidv4(), // generate unique userId
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      userId: newUser.userId,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("login success");
    // Generate token
    const payload = {
      id: user?.userId,
      email: user?.email,
    };
    console.log(payload.id);
    const token = generateToken(payload);

    console.log(token);

    // Send only the token in the response
    return res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
