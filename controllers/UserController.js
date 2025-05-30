// Import the User model
const User = require('../models/User');

// Controller object containing methods for user-related operations
const UserController = {
    // Fetch a user by their ID
    getUserById: async (req, res) => {
        try {
            const userId = req.params.id; // Extract user ID from request parameters
            const user = await User.findById(userId); // Find user in database
            if (!user) {
                // If user not found, send 404 response
                return res.status(404).json({ message: 'User not found' });
            }
            // Return user data with 200 OK status
            res.status(200).json(user);
        } catch (error) {
            // Log error and send 500 Internal Server Error
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Create a new user
    createUser: async (req, res) => {
        try {
            const userData = req.body; // Get user data from request body
            const newUser = new User(userData); // Instantiate new User
            await newUser.save(); // Save to database
            // Respond with created user and 201 Created status
            res.status(201).json(newUser);
        } catch (error) {
            // Log error and respond with 500 error
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Update existing user by ID
    updateUserById: async (req, res) => {
        try {
            const userId = req.params.id; // Extract user ID
            const userData = req.body; // Updated data from request body
            // Find user by ID and update with new data, returning the updated document
            const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });
            if (!updatedUser) {
                // If user not found, respond with 404
                return res.status(404).json({ message: 'User not found' });
            }
            // Return updated user data
            res.status(200).json(updatedUser);
        } catch (error) {
            // Log error and respond with 500
            console.error('Error updating user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Delete user by ID
    deleteUserById: async (req, res) => {
        try {
            const userId = req.params.id; // Extract user ID
            const deletedUser = await User.findByIdAndDelete(userId); // Delete user
            if (!deletedUser) {
                // If user does not exist
                return res.status(404).json({ message: 'User not found' });
            }
            // Confirm deletion
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            // Log error and send 500 response
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

// Export the controller for use in route definitions
module.exports = UserController;
