// Import the Express framework
const express = require('express');
const router = express.Router(); // Create an instance of an Express router

// Import authentication middleware (Not used in this file, but can be useful for protected routes)
const auth = require('../config/auth');
const patient = require('../controller/patient'); // Import the patient controller

// Route to register a new patient
router.post('/registers',patient.register);

// Export the router to use in the main server file
module.exports = router;
