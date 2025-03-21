const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.checkAuthentication = function (req, res, next) {
    try {
        console.log('Incoming Headers:', req.headers); // Log all headers for debugging
        console.log('Authorization Header:', req.headers.authorization); // Debugging log

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header is missing',
            });
        }

        const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

        if (!token) {
            return res.status(401).json({
                message: 'Token is missing in the Authorization header',
            });
        }

        console.log('Token:', token); // Log the token for debugging

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error('JWT Verification Error:', err.message); // Log the error
                return res.status(401).json({
                    message: 'Invalid or expired token',
                });
            }

            console.log('Decoded Token:', decoded); // Log the decoded token
            req.user = decoded; // Attach decoded token data to the request object
            next();
        });
    } catch (error) {
        return res.status(500).json({
            message: 'An error occurred during authentication',
            error: error.message,
        });
    }
};
