const express = require('express'); // Import Express framework
const User = require('../models/User'); // Import the User model/schema

// Function to create and configure the profile retrieval route handler
function createProfileRetrievalHandler() {
  const router = express.Router(); // Create a new router instance

  // Define a GET route to fetch a user's learning style by their email
  router.get('/:email', async (req, res) => {
    const { email } = req.params; // Extract email parameter from URL

    try {
      // Query the database to find the user with the specified email
      // Using `.select('learning_style')` to retrieve only the learning_style field
      const user = await User.findOne({ email }).select('learning_style');

      // If no user is found with the provided email
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Respond with the user's learning style
      res.json({ learningStyle: user.learning_style });
    } catch (error) {
      // Log any errors encountered during database query
      console.error('Error:', error);
      // Return a server error response
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Return the configured router
  return router;
}

module.exports = createProfileRetrievalHandler; // Export the function to create the router
