// Import Express for routing and the model factory function
const express = require('express');
const { getLanguageContentModel } = require('./languageContentModel');

const router = express.Router();

// Define mapping from route parameter to actual collection names
const collectionMappings = {
    spanish: 'SpanishContent',
    french: 'FrenchContent',
    // Add other language mappings as needed
};

// Route to fetch content for a specific language with pagination
// URL format: /:language/:startEndIndices (e.g., /spanish/1-10)
router.get('/:language/:startEndIndices', async (req, res) => {
    try {
        const { language, startEndIndices } = req.params;
        // Split the start-end indices from URL parameter and convert to numbers
        const [startIndex, endIndex] = startEndIndices.split('-').map(Number);

        // Map the language parameter to the collection name
        const collectionName = collectionMappings[language.toLowerCase()];
        if (!collectionName) {
            // Return 404 if the language is not supported
            return res.status(404).json({ message: 'Language not found' });
        }

        // Get the Mongoose model for the specified collection
        const ContentModel = getLanguageContentModel(collectionName);

        // Query the collection with pagination
        const content = await ContentModel.find({})
            .skip(startIndex - 1) // Skip documents before the start index
            .limit(endIndex - startIndex + 1); // Limit to the range size

        // Send the fetched documents as JSON response
        res.json({ content });
    } catch (error) {
        // Log the error and respond with server error status
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Export the router to be used in your main app
module.exports = router;
