// Import the Mongoose library to work with MongoDB
const mongoose = require('mongoose');

// Define a sub-schema for the user's learning style
// This schema captures preferences across different learning modalities
const learningStyleSchema = new mongoose.Schema({
  visual: Number,  // Represents the user's visual learning score
  verbal: Number,  // Represents the user's verbal learning score
  active: Number,  // Represents the user's active learning score
});

// Define the main user schema
const userSchema = new mongoose.Schema({
  // User's type (e.g., student, teacher, admin, recreational)
  user_type: {
    type: String,
    required: true
  },
  // User's country of residence
  country: {
    type: String,
    required: true
  },
  // User's gender
  gender: {
    type: String,
    required: true
  },
  // User's age
  age: {
    type: Number,
    required: true
  },
  // User's password (should be hashed in a real-world scenario)
  password: {
    type: String,
    required: true
  },
  // Unique username for login purposes
  username: {
    type: String,
    required: true,
    unique: true
  },
  // Unique email address for contact and login
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Role within the system, defaults to 'student'
  role: {
    type: String,
    enum: ['admin', 'student', 'teacher', 'recreational'], // Allowed roles
    default: 'student'
  },
  // Embedding the learningStyleSchema to store learning preferences
  learning_style: {
    type: learningStyleSchema
  },
  
  // A numerical field possibly tracking progress or next lesson
  nextWord: Number,

  // Enrolled courses represented as an object (could be more structured)
  enrolled_courses: {
    type: Object,
    default: {} // Defaults to an empty object if no courses enrolled
  }
}, { 
  // Specify custom collection name in MongoDB
  collection: 'UserCollection' 
});

// Create a Mongoose model based on the schema
const User = mongoose.model('User', userSchema);

// Export the User model for use in other parts of the application
module.exports = User;
