// routes/logout.js

const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance

// POST route to handle user logout
router.post('/', async (req, res) => {
    try {
        // Since logout is often handled client-side (e.g., deleting tokens),
        // this endpoint currently only sends a success message.
        // Actual logout logic (like token invalidation) should be handled in Unity or client-side.
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        // Log any errors that occur during logout process
        console.error('Error logging out:', error);
        // Send a 500 Internal Server Error response
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; // Export the router for use in your main app
