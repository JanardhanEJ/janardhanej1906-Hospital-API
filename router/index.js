// Import the Express framework
const express = require('express');
const router = express.Router(); // Create an instance of an Express router

const doctor = require('../controller/doctor'); // Import the doctor controller
const auth = require('../config/auth'); // Import authentication middleware
const reportController = require('../controller/report'); // Import the report controller

// Root route - Calls the home function from the doctor controller
router.get('/', doctor.home);

// Route for doctor-related requests (handled in the 'doctor' router)
router.use('/doctor', require('./doctor'));

// Route for patient-related requests (handled in the 'patient' router)
router.use('/patients', require('./patient'));

// Route for patient reports (handled in the 'report' router)
router.use('/patients', require('./report'));
router.use('/reports', require('./report'));

// Example route for creating a report - Requires authentication
router.post('/report/create', auth.checkAuthentication, reportController.createReport);

// Export the router for use in the main server file
module.exports = router;
