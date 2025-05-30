// Import Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define a common schema for language content, such as questions and answers
const LanguageContentSchema = new mongoose.Schema({
    // Unique identifier for the subject content
    subjectContentID: Number,
    // The question text
    Question: String,
    // The answer text
    Answer: String,
});

// Factory function to retrieve or create a model for a given collection name
function getLanguageContentModel(collectionName) {
    // Check if a model with this collection name already exists
    if (mongoose.models[collectionName]) {
        // Return the existing model
        return mongoose.model(collectionName);
    }
    // Create and return a new model bound to the specified collection
    // The third parameter explicitly sets the collection name in MongoDB
    return mongoose.model(collectionName, LanguageContentSchema, collectionName);
}

// Export the factory function for use in other parts of the application
module.exports = { getLanguageContentModel };
