// Import the Express framework
const express = require('express');
const router = express.Router(); // Create an instance of an Express router

// Import the doctor controller
const doctor = require('../controller/doctor');

// Middleware to log request processing time for the /register route
router.use('/register', (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`POST /register took ${duration}ms`); // Log the time taken to process the request
    });

    // Move to the next middleware or route handler
    next();
});

// Route to handle doctor registration
router.post('/register', doctor.Register);

// Route to handle doctor login
router.get('/login', doctor.Login);

// Export the router to use in the main server file
module.exports = router;
