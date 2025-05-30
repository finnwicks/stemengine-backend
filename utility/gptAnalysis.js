const axios = require('axios');

// Function to analyze the extracted symbols with GPT
// This function takes an array of symbols as input and sends them to the OpenAI API for analysis.
// It uses the 'text-davinci-002' model to generate a response based on the input symbols.
// The maximum number of tokens in the response is set to 150.
async function analyzeWithGPT(symbols) {
    try {
        // Make an API call to GPT with the extracted symbols as input
        // The symbols are joined into a single string to form the prompt for the API call.
        // The API endpoint is 'https://api.openai.com/v1/completions'.
        // The request includes the prompt, model specification, and maximum token limit.
        const response = await axios.post('https://api.openai.com/v1/completions', {
            prompt: symbols.join(' '), // Join the symbols into a single string
            model: 'text-davinci-002',
            max_tokens: 150
        }, {
            headers: {
                'Authorization': 'Bearer YOUR_OPENAI_API_KEY', // Replace with your OpenAI API key
                'Content-Type': 'application/json'
            }
        });

        // Process and return the analysis result
        // The generated text from the API response is extracted and logged.
        // The function returns the generated text as the analysis result.
        const generatedText = response.data.choices[0].text;
        console.log('Generated analysis:', generatedText);
        return generatedText;
    } catch (error) {
        // If an error occurs during the API call, it is caught and logged.
        // A new error is thrown to indicate that the symbol analysis failed.
        console.error('Error analyzing symbols with GPT:', error);
        throw new Error('Failed to analyze symbols with GPT');
    }
}

// Export the analyzeWithGPT function to be used in other modules.
module.exports = { analyzeWithGPT };
