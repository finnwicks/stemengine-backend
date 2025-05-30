// routes/changePassword.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Helper function to check password complexity
const isPasswordComplex = (password) => {
  // Regex enforces:
  // At least one lowercase letter
  // At least one uppercase letter
  // At least one digit
  // At least one special character
  // Minimum length of 8 characters
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  return passwordRegex.test(password);
};

// PUT route to handle password change requests
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from URL parameters
    const { currentPassword, newPassword } = req.body; // Extract current and new passwords from request body

    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      // If user not found, respond with 404
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify that the provided current password matches the stored password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      // If password does not match, respond with 401 Unauthorized
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    // Validate the new password's complexity
    if (!isPasswordComplex(newPassword)) {
      return res.status(400).json({ 
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' 
      });
    }

    // Hash the new password before saving
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedNewPassword;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    // Log any errors to the console for debugging
    console.error('Error changing password:', error);
    // Respond with 500 Internal Server Error
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
