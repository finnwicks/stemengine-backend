const jwt = require('jsonwebtoken');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = (new JSDOM('')).window;
const DOMPurify = createDOMPurify(window);

// A utility module with various functions

// Function to generate a random alphanumeric string of given length
// This function creates a random string consisting of uppercase and lowercase letters and digits.
// The length of the string is specified by the input parameter.
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

// Function to generate a unique identifier (UUID)
// This function generates a UUID version 4, which is a 36-character string.
// The UUID is created using a combination of random hexadecimal values.
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to sanitize user input (e.g., remove HTML tags and sanitize with DOMPurify)
// This function takes a string input and removes any HTML tags, helping to prevent XSS attacks.
// It uses DOMPurify for HTML sanitization and a regular expression to strip out HTML tags from the input string.
function sanitizeInput(input) {
    // First, sanitize the input using DOMPurify
    const sanitized = DOMPurify.sanitize(input);
    // Then, strip any remaining HTML tags using a regular expression
    return sanitized.replace(/<[^>]*>/g, '');
}

// Function to format a date object to a string in a specified format
// This function takes a Date object and a format string, and returns a string representation of the date.
// The format string can include 'YYYY' for the year, 'MM' for the month, and 'DD' for the day.
// Default format is 'YYYY-MM-DD'.
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return format.replace('YYYY', year).replace('MM', month).replace('DD', day);
}

// Export the utility functions for use in other modules
module.exports = {
    generateRandomString,
    generateUUID,
    sanitizeInput,
    formatDate
};

// Export Code
const { generateRandomString, generateUUID, sanitizeInput, formatDate } = require('./utils');
