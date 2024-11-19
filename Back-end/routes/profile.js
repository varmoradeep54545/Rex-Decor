// routes/profile.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcryptjs');

// PUT /api/profile/save
router.put("/save/:userId", async (req, res) => {
  // Extract userId from the URL params, not from the body
  const { userId } = req.params;

  const { firstName, lastName, phone, address, city, country, postalCode } =
    req.body;

  try {
    // Find user by userId (from params)
    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user profile data
    user.firstName = firstName;
    user.lastName = lastName;
    user.phone = phone;
    user.address = address;
    user.city = city;
    user.country = country;
    user.postalCode = postalCode;

    // Save the updated user data
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Error saving profile data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/profile/:userId
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find user by userId
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Log the user data

    // Return user profile data inside "profile" object
    res.status(200).json({ profile: user });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/change-password/:userId", async (req, res) => {
  try {
    // Extract userId from the URL params
    const { userId } = req.params;
    const { oldPassword, newPassword } = req.body;

    console.log("Request params:", req.params); // Debugging
    console.log("Request body:", req.body); // Debugging

    // Ensure userId is present
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find user by userId (adjusting query if necessary)
    let user = await User.findOne({ userId }); // Adjust field name if needed

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the old password is correct
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid old password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update and save the user password
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in change-password route:", error);
    res.status(500).json({ message: "Server error" });
  }
});





module.exports = router;
