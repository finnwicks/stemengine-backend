const express = require('express'); // Import Express framework
const axios = require('axios'); // Import Axios for making HTTP requests

const promptRouter = express.Router(); // Create a new router instance

// Route handler for generating prompts
promptRouter.post('/', (req, res) => {
  // Retrieve prompt parameters from request body
  const { subject, difficulty, questionContext, rule } = req.body;

  // Construct the prompt string based on user input
  const prompt = `Write me a ${questionContext} question for a user for ${subject}, which is ${difficulty}, on a scale of 0 to 1, showcasing ${rule}, and provide an explanation.`;

  // Make a POST request to DeepAI API to generate text completion
  axios.post('https://api.openai.com/v1/completions', {
    prompt: prompt, // The prompt string created above
    model: 'gpt-4.1-nano-2025-04-14', // Specify the GPT model to use
    max_tokens: 150 // Limit the length of the generated output
  }, {
    headers: {
      'Authorization': `Bearer YOUR_OPENAI_API_KEY`, // Replace with your actual API key
      'Content-Type': 'application/json' // Content type header
    }
  })
  .then(response => {
    // Extract the generated text from the response
    const generatedText = response.data.choices[0].text;
    console.log('Generated text:', generatedText); // Log generated text for debugging

    // Send the generated prompt back to the client
    res.json({ prompt: generatedText });
  })
  .catch(error => {
    // Log any errors during API request
    console.error('Error generating prompt:', error);
    // Respond with an error status and message
    res.status(500).json({ error: 'Failed to generate prompt' });
  });
});

module.exports = promptRouter; // Export the router for use in other parts of the application
