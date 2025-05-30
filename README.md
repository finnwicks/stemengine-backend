# README for Express.js Backend Server
## Overview
This is a Node.js application built using the Express framework. It provides a robust backend API with various routes for user authentication, profile management, and educational content retrieval. The server is configured to use HTTPS for secure communication.

## Features
User Authentication: Routes for login, signup, logout, and password management.
Profile Management: Routes to update user profiles and retrieve learning profiles.
Educational Content: Routes to retrieve menus, subject content, and Q&A pairs.
HTTPS: Secure communication using SSL certificates.
MongoDB: Data storage using Mongoose for MongoDB object modelling.

## Installation
Clone the repository:
  git clone <repository-url>,
  cd <repository-name>
  
### Install dependencies:
  npm install
  
### Set environment variables:
Create a .env file in the root directory and add the following variables:
  MONGODB_URI=your-mongodb-connection-string,
  JWT_SECRET=your-secret-key

### Start the server:
  npm start
  
## Directory Structure
project/
  node_modules/
  routes/
    login.js
    signup.js
    updateProfile.js
    changePassword.js
    deleteAccount.js
    logout.js
    forgotPassword.js
    retrieveMenu.js
    retrieveLearningProfile.js
    prompt.js
    workingAnalysis.js
    subjectContent.js
    retrieveQnA.js
    levelComplete.js
  models/
    LanguageContentModel.js
  utility/
    gptAnalysis.js
    server.key
    server.cert
    package.json
    package-lock.json
    .env
  server.js

### Routes:

Authentication:
	POST /login: Log in a user.
	POST /signup: Sign up a new user.
	POST /logout: Log out a user.
	POST /forgot-password: Handle password reset requests.

Profile Management:
	PUT /update-profile: Update user profile information.
	GET /retrieve-learning-profile: Retrieve user learning profile.

Educational Content:
	GET /retrieve-menu: Retrieve menu options.
	GET /subject-content: Retrieve subject content.
	GET /retrieve-content: Retrieve Q&A pairs.
	POST /level-complete: Track level completion.

Password Management:
	PUT /change-password: Change the user's password.
	DELETE /delete-account: Delete the user's account.

Middleware
	bodyParser.json(): Middleware to parse JSON request bodies.
	Debug Middleware: Logs requests to the /level-complete route.

Error Handling
The server includes a global error-handling middleware that catches and logs errors, returning a 500 Internal Server Error response.

SSL Certificates
Ensure you have your SSL certificate and private key files (server.key and server.cert) in the root directory of your project. These are used to configure the HTTPS server.

## Screenshot Analysis and Personalized Feedback
### Overview
This feature allows users to take a screenshot of their working area (e.g., a math or physics problem they are solving) and receive personalized feedback. The process involves several steps: capturing the screenshot, analyzing the symbols using Tesseract for Optical Character Recognition (OCR), and then passing the recognized text to a generative pre-trained transformer API for evaluation and feedback. The final feedback is formatted into JSON and sent back to the user.

Steps
Capture Screenshot:

The user takes a screenshot of their working area. This can be done using a browser extension or a desktop application that captures the screen and sends the image to the server.
Analyze Symbols with Tesseract:

The server receives the screenshot and uses Tesseract, an open-source OCR engine, to analyze the image and extract text and symbols.
Tesseract is configured to recognize mathematical and scientific symbols, ensuring accurate extraction of the content from the screenshot.
Pass to Generative Pre-trained Transformer API:

The extracted text and symbols are then passed to a generative pre-trained transformer API, such as one provided by OpenAI.
The API evaluates the content, provides a detailed analysis, and generates personalized feedback based on the input.
Format Feedback into JSON:

The feedback received from the generative API is formatted into a JSON structure, including details such as the original input, the analysis, and the personalized feedback.
Send Feedback to User:

The JSON-formatted feedback is sent back to the user, who can then review the detailed analysis and personalised suggestions for improving their work.
Example Workflow
User Action:

The user solves a physics problem on their screen and takes a screenshot using a designated tool.
Server Processing:

The screenshot is uploaded to the server.
Tesseract processes the image and extracts the text: "F = ma, where F is force, m is mass, and a is acceleration."
The extracted text is sent to the generative API for analysis.
Generative API Response:

The API returns a detailed response, including an explanation of Newton's Second Law, common mistakes, and tips for remembering the formula.
JSON Feedback:

json:
{
  "original_input": "F = ma, where F is force, m is mass, and a is acceleration.",
  "analysis": "This equation represents Newton's Second Law of Motion, which states that the force acting on an object is equal to its mass times its acceleration.",
  "feedback": {
    "explanation": "Newton's Second Law is fundamental in physics and describes the relationship between force, mass, and acceleration.",
    "common_mistakes": ["Confusing force with momentum", "Incorrect units for acceleration"],
    "tips": ["Remember that force is a vector quantity", "Always check your units"]
  }
}

User Receives Feedback:

The user receives the JSON feedback and can review the detailed analysis and personalized suggestions.


### Dependencies
express: Web framework for Node.js.
body-parser: Middleware to parse incoming request bodies.
mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
fs: Node.js built-in module for file system operations.
https: Node.js built-in module for creating HTTPS servers.
Tesseract: Optical Character Recognition (OCR) for the personalised feedback feature
