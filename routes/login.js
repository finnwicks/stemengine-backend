const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing comparison
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for token generation
const User = require('../models/User'); // Import User model

// Export a function that accepts JWT_SECRET as a parameter
module.exports = (JWT_SECRET) => {
  // Define a POST route for user login
  router.post('/', async (req, res) => {
      try {
          // Extract email and password from the request body
          const { email, password } = req.body;

          // Find the user in the database by email
          const user = await User.findOne({ email });
          if (!user) {
              // If user not found, respond with 404
              return res.status(404).json({ message: 'User not found' });
          }

          // Compare the provided password with the stored hashed password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
              // If password doesn't match, respond with 401 Unauthorized
              return res.status(401).json({ message: 'Invalid password' });
          }

          // Generate a JWT token using the provided secret
          const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

          // Send the token back to the client
          res.status(200).json({ token });
      } catch (error) {
          // Log any errors that occur during login process
          console.error('Error in user login:', error);
          // Respond with a 500 Internal Server Error
          res.status(500).json({ message: 'Internal server error' });
      }
  });

  // Return the configured router
  return router;
};
