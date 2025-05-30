const express = require('express');
const User = require('../models/User'); // Import User model
const LanguageContent = require('../models/LanguageContentModel'); // Import LanguageContent model if needed

const router = express.Router();

router.get('/:email/:subject', async (req, res) => {
  try {
    const { email, subject } = req.params;

    // Log the received email and subject for debugging
    console.log('Received email:', email);
    console.log('Received subject:', subject);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    // Log enrolled courses object
    console.log('Enrolled courses:', user.enrolled_courses);

    // Check if the user is enrolled in the specified subject
    const nextWord = user.enrolled_courses[subject];

    if (!nextWord) {
      // User is not enrolled in the specified subject
      console.log('User is not enrolled in the specified subject');

      // Log the type and value of the subject string
      console.log('Type of subject string:', typeof subject);
      console.log('Value of subject string:', subject);

      // If enrolled_courses is an object, list its keys
      if (user.enrolled_courses && typeof user.enrolled_courses === 'object') {
        console.log('Enrolled courses keys:', Object.keys(user.enrolled_courses));
        console.log('Type of enrolled_courses:', typeof user.enrolled_courses);
      } else {
        console.log('enrolled_courses is not an object');
      }

      return res.status(404).json({ message: 'Subject string does not match any enrolled course key' });
    }

    // Return the associated number (nextWord) for the subject
    res.json({ nextWord });
  } catch (error) {
    // Log and handle errors
    console.error('Error retrieving number associated with subject:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
