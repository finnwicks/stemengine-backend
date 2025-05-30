const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');

// Import route handlers
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const updateProfileRoute = require('./routes/updateProfile');
const changePasswordRouter = require('./routes/changePassword');
const deleteAccountRouter = require('./routes/deleteAccount');
const logoutRouter = require('./routes/logout');
const forgotPasswordRouter = require('./routes/forgotPassword');
const retrieveMenuRouter = require('./routes/retrieveMenu');
const retrieveProfileRouter = require('./routes/retrieveLearningProfile');
const promptRouter = require('./routes/prompt');
const workingAnalysisRouter = require('./routes/workingAnalysis');
const subjectContentRouter = require('./routes/subjectContent');
const subjectRetrievalRouter = require('./routes/retrieveQnA');
const levelCompleteRouter = require('./routes/levelComplete');

const { initializeGPTAnalysis } = require('./utility/gptAnalysis');
const LanguageContent = require('./models/LanguageContentModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Set your MongoDB URI and JWT secret here
const MONGODB_URI = 'your-mongodb-connection-string'; // Replace with your MongoDB connection string
const JWT_SECRET = 'your-secret-key'; // Replace with your JWT secret

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // After successful DB connection, start the HTTPS server
    const server = https.createServer({
      key: fs.readFileSync('server.key'), // Path to your SSL private key file
      cert: fs.readFileSync('server.cert') // Path to your SSL certificate file
    }, app);

    server.listen(PORT, () => {
      console.log(`HTTPS Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Debug middleware for /level-complete route
app.use('/level-complete', (req, res, next) => {
  console.log('Request received at /level-complete');
  next(); // Proceed to the route handler
});

// Route handlers setup
// Note: For routes requiring JWT, pass the secret as needed
app.use('/login', loginRouter(JWT_SECRET)); // Login route, uses JWT secret
app.use('/signup', signupRouter(JWT_SECRET)); // Signup route
app.use('/update-profile', updateProfileRoute(JWT_SECRET)); // Update user profile
app.use('/change-password', changePasswordRouter); // Change password
app.use('/delete-account', deleteAccountRouter); // Delete user account
app.use('/logout', logoutRouter); // Logout route
app.use('/forgot-password', forgotPasswordRouter); // Password reset
app.use('/retrieve-menu', retrieveMenuRouter); // Retrieve menu options
app.use('/retrieve-learning-profile', retrieveProfileRouter(JWT_SECRET)); // Retrieve user learning profile

// Commented out routes, uncomment if needed
// app.use('/prompt', promptRouter);
// app.use('/working-analysis', workingAnalysisRouter);

app.use('/subject-content', subjectContentRouter); // Subject content
app.use('/retrieve-content', subjectRetrievalRouter); // Retrieve Q&A pairs
app.use('/level-complete', levelCompleteRouter); // Level completion tracking

// Root route
app.get('/', (req, res) => {
  res.send('Sanity Check: OK!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal server error');
});
