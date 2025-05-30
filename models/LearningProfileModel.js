// Import the Mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define a schema for the user's learning profile, capturing various learning style and preference metrics
const learningProfileSchema = new mongoose.Schema({
  // Reference to the User document (ObjectId), establishing a relationship
  userId: {
    type: mongoose.Schema.Types.ObjectId, // MongoDB ObjectId type
    ref: 'User',                            // Reference to the 'User' collection
    required: true,                         // This field is mandatory
    unique: true                          // Each user can have only one learning profile
  },
  // Learning style dimensions with numerical scores
  visual: Number,          // Visual learning preference score
  verbal: Number,          // Verbal learning preference score
  active: Number,          // Preference for active learning
  reflective: Number,      // Preference for reflective learning
  sensing: Number,         // Sensing style score
  intuitive: Number,       // Intuitive style score
  sequential: Number,      // Sequential learning preference
  global: Number,          // Global learning preference
  social: Number,          // Preference for social learning environments
  solitary: Number,        // Preference for solitary learning environments
  analytical: Number,      // Analytical thinking score
  holistic: Number         // Holistic thinking score
});

// Create a Mongoose model named 'LearningProfile' based on the schema
const LearningProfile = mongoose.model('LearningProfile', learningProfileSchema);

// Export the model to be used in other parts of the application
module.exports = LearningProfile;
