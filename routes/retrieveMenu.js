const express = require('express'); // Import Express framework
const router = express.Router(); // Create a new router instance
const User = require('../models/User'); // Import the User model/schema

// Define a GET route to fetch enrolled courses based on user's email
router.get('/:email', async (req, res) => {
    try {
        // Retrieve the user document matching the email, selecting only 'enrolled_courses'
        const user = await User.findOne({ email: req.params.email }, 'enrolled_courses');

        // Check if user exists and has enrolled courses
        if (!user || !user.enrolled_courses || user.enrolled_courses.length === 0) {
            // If no user or no enrolled courses found, respond with a 404 status
            return res.status(404).json({ message: 'No enrolled courses found for the user' });
        }

        // Respond with the enrolled courses
        res.status(200).json({ enrolledCourses: user.enrolled_courses });
    } catch (error) {
        // Log any errors during database query
        console.error('Error retrieving enrolled courses:', error);
        // Send a 500 Internal Server Error response
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; // Export the configured router
