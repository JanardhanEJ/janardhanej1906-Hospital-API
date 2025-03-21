// Import the Express framework
const express = require('express');
const router = express.Router(); // Create an instance of an Express router

// Import authentication middleware
const auth = require('../config/auth');

// Import the report controller
const createReport = require('../controller/report');

// Route to create a report for a specific patient (Requires authentication)
// :id -> Represents the patient's unique ID
router.post('/:id/create_report' ,auth.checkAuthentication, createReport.createReport);

// Route to fetch all reports of a specific patient (Requires authentication)
// :id -> Represents the patient's unique ID
router.get('/:id/all_report' ,auth.checkAuthentication, createReport.allReport);

// Route to fetch reports based on status (No authentication required)
// :status -> Represents the report status (e.g., Negative, Positive-Admit, Symptoms-Quratine, Travelled-Qurantine)
router.get('/:status' , createReport.status);

// Export the router to use in the main server file
module.exports = router;
