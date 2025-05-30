// Import Mongoose library
const mongoose = require('mongoose');

// Define a schema for questions and answers
const QuestionAnswerSchema = new mongoose.Schema({
    // Unique identifier for the question
    questionID: Number,
    // The question text
    questionText: String,
    // The answer text
    answerText: String,
});

// Since it's a general collection, you can name the model 'QuestionAnswer'
module.exports = mongoose.model('QuestionAnswer', QuestionAnswerSchema, 'QuestionAnswers');
