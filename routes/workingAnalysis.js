const express = require('express');
const { recognize } = require('tesseract.js');
const { analyzeWithGPT } = require('../utility/gptAnalysis'); // Import the analyzeWithGPT function

const workingAnalysisRouter = express.Router();

// Route handler for processing user's handwritten workings and generating analysis
workingAnalysisRouter.post('/', async (req, res) => {
  try {
    const { imageData } = req.body;

    if (!imageData) {
      return res.status(400).json({ message: 'Image data is required' });
    }

    // Perform OCR using Tesseract
    const { data: { text } } = await recognize(imageData, 'eng', { logger: m => console.log(m) });

    // Pass the extracted text to the GPT model for analysis
    const analysisResult = await analyzeWithGPT(text);

    // Send the analysis result back to the user
    res.json({ analysis: analysisResult });
  } catch (error) {
    console.error('Error processing handwritten workings:', error);
    res.status(500).json({ error: 'Failed to process handwritten workings' });
  }
});

module.exports = workingAnalysisRouter;
