const express = require('express');
const User = require('../models/User'); // Import the User model

const router = express.Router(); // Create a new router instance

// Define a PUT route to update user's enrolled course progress
router.put('/level-complete/:userEmail/:subject/:lastIndex', async (req, res) => {
    try {
        // Destructure route parameters from the URL
        const { userEmail, subject, lastIndex } = req.params;

        // Log received parameters for debugging
        console.log('Received request for level completion with email:', userEmail);
        console.log('Subject:', subject);
        console.log('Last index received:', lastIndex);

        // Find the user profile in the database by email
        const userProfile = await User.findOne({ email: userEmail });

        // If user profile not found, respond with 404
        if (!userProfile) {
            console.log('User profile not found');
            return res.status(404).json({ message: 'User profile not found' });
        }

        // Check if the specified subject exists within the user's enrolled courses
        if (!userProfile.enrolled_courses.hasOwnProperty(subject)) {
            console.log('Subject not found in enrolled courses');
            return res.status(404).json({ message: 'Subject not found in enrolled courses' });
        }

        // Update the progress for the subject by setting it to the provided lastIndex
        userProfile.enrolled_courses[subject] = parseInt(lastIndex);

        // Log the update for debugging
        console.log('Updated nextWord for subject:', userProfile.enrolled_courses[subject]);

        // Save the updated user profile back to the database
        await userProfile.save();

        // Confirm success to the client
        console.log('User profile updated successfully');
        res.json({ message: 'User profile updated successfully' });
    } catch (error) {
        // Log any errors that occur during the process
        console.error('Error updating user profile:', error);
        // Send a generic server error response
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router; // Export the router for use in the main app
