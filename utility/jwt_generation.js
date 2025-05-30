const jwt = require('jsonwebtoken');

// Function to generate a JSON Web Token (JWT)
// This function takes a user object, a secret key, and an optional expiration time as input.
// It creates a JWT containing the user's ID and returns it.
function generateToken(user, secretKey, expiresIn = '1h') {
    // The jwt.sign method is used to create the token.
// It takes the payload (user ID), the secret key, and options (expiration time).
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn });
    return token;
}

// Export the generateToken function to be used in other modules.
module.exports = generateToken;
