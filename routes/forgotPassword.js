const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const PasswordResetToken = require('../models/PasswordResetToken'); // Create this model
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

// Rate limiter for this route: e.g., 5 requests per hour per IP
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { message: 'Too many password reset requests from this IP, please try again later.' }
});

// Apply rate limiter middleware
router.use(limiter);

// POST route for forgot password
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // To prevent user enumeration, respond with success anyway
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
    }

    // Generate a reset token
    const resetToken = jwt.sign(
      { userId: user._id },
      process.env.RESET_PASSWORD_SECRET,
      { expiresIn: '1h' }
    );

    // Save token in database for validation later
    await PasswordResetToken.create({
      userId: user._id,
      token: resetToken,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour expiry
      used: false
    });

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: 'Reset Your Password',
      html: `<p>Hello ${user.username},</p>
             <p>You have requested to reset your password. Please click the link below to reset your password:</p>
             <p><a href="${process.env.CLIENT_URL}/reset-password/${resetToken}">Reset Password</a></p>`
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
  } catch (error) {
    // No sensitive info logged
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
