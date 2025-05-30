const { createWorker } = require('tesseract.js');

// Function to identify symbols in a handwritten image using Tesseract OCR
async function identifySymbols(imageData) {
  const worker = createWorker();

  try {
    // Initialize Tesseract worker
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');

    // Recognize text from the image data
    const { data: { text } } = await worker.recognize(imageData);

    // Split the recognized text into individual symbols
    // Assuming symbols are separated by spaces; adjust if needed
    const symbols = text.trim().split(/\s+/);

    // Return the identified symbols
    return symbols;
  } catch (error) {
    console.error('Error identifying symbols with Tesseract:', error);
    throw new Error('Failed to identify symbols with Tesseract');
  } finally {
    // Ensure the worker is terminated to free resources
    await worker.terminate();
  }
}

module.exports = {
  identifySymbols
};
