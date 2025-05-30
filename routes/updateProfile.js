const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Export a function that accepts JWT_SECRET as a parameter
module.exports = (JWT_SECRET) => {
  // PUT route to update user profile by ID
  router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const token = req.headers['token']; // Or 'authorization' header if preferred
    const updatedProfile = req.body;

    try {
      // Check if token is provided
      if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
      }

      // Verify JWT token
      const decoded = jwt.verify(token, JWT_SECRET);

      // Ensure the token's userId matches the route parameter
      if (decoded.userId !== userId) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      // Find and update the user profile
      const user = await User.findByIdAndUpdate(userId, updatedProfile, { new: true });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error('Error updating profile:', error);

      // Handle JWT verification errors separately if needed
      if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Invalid token' });
      }

      res.status(500).json({ message: 'Internal server error' });
    }
  });

  return router;
};
