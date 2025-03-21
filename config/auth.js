const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.checkAuthentication = function (req, res, next) {
    try {
        // Log all incoming headers for debugging purposes
        console.log('Incoming Headers:', req.headers);

        // Extract the Authorization header from the request
        const authHeader = req.headers.authorization;
        console.log('Authorization Header:',authHeader); // Log the Authorization header

        // If no authorization header is present, return an error response
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header is missing',
            });
        }

        // Extract the token from the "Bearer <token>" format
        const token = authHeader.split(' ')[1];

        // If no token is found after "Bearer", return an error response
        if (!token) {
            return res.status(401).json({
                message: 'Token is missing in the Authorization header',
            });
        }

        // Log the extracted token for debugging
        console.log('Token:', token);

        // Verify the token using the secret key stored in environment variables
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message);  // Log the error if token verification fails
                return res.status(401).json({
                    message: 'Invalid or expired token',
                });
            }

            // Log the decoded token payload for debugging
            console.log('Decoded Token:', decoded);

            // Attach the decoded token data (usually user info) to the request object
            req.user = decoded;

            // Proceed to the next middleware or route handler
            next();
        });
    } catch (error) {
        // Handle unexpected server errors during authentication
        return res.status(500).json({
            message: 'An internal error occurred during authentication',
            error: error.message,
        });
    }
};
