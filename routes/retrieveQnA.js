// Import Express and the QuestionAnswer model
const express = require('express');
const QuestionAnswer = require('./questionAnswerModel');

const router = express.Router();

// Route to get questions with optional pagination
// Example URL: /questions?start=1&limit=10
router.get('/questions', async (req, res) => {
    try {
        const startIndex = parseInt(req.query.start) || 1; // default to 1 if not specified
        const limit = parseInt(req.query.limit) || 10; // default to 10 if not specified

        // Fetch questions with pagination
        const questions = await QuestionAnswer.find({})
            .skip(startIndex - 1)
            .limit(limit);

        res.json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a specific question by ID
// Example URL: /question/123
router.get('/question/:questionID', async (req, res) => {
    try {
        const { questionID } = req.params;
        const question = await QuestionAnswer.findOne({ questionID: Number(questionID) });
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router
module.exports = router;
