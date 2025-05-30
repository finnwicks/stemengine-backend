// routes/deleteAccount.js

const express = require('express');
const router = express.Router();
const User = require('../models/User');

// DELETE route to delete a user account
router.delete('/:userId', async (req, res) => {
    try {
        // Extract userId from URL parameters
        const { userId } = req.params;

        // Find the user in the database by their ID
        const user = await User.findById(userId);
        if (!user) {
            // If user is not found, respond with 404 Not Found
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove the user document from the database
        await user.remove();

        // Send success response indicating account deletion
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        // Log any errors to the server console for debugging
        console.error('Error deleting user account:', error);
        // Send a 500 Internal Server Error response
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
