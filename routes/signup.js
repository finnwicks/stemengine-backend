const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
 
// Export a function that accepts JWT_SECRET as a parameter
module.exports = (JWT_SECRET) => {
  const router = express.Router();

  // POST route for user registration
  router.post('/', async (req, res) => {
    try {
      // Destructure user data from request body
      const {
        username,
        email,
        password,
        name,
        age,
        gender,
        country,
        user_type
      } = req.body;

      // Check if a user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        // Respond with error if email is already registered
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password before storing
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user instance
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        name,
        age,
        gender,
        country,
        user_type,
        created_at: new Date(),
        updated_at: new Date()
      });

      // Save the new user to the database
      await newUser.save();

      // Respond with success message
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      // Log and handle unexpected errors
      console.error('Error in user registration:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Return the configured router
  return router;
};
