// Import the Report model
const Report = require('../models/report');

// Function to create a new report or return an existing one
module.exports.createReport = async function (req, res) {
    try {
        // Search for an existing report with the given data
        // If report exists, return the found reports
        let report = await Report.find(req.body);
        if (report && report.length > 0) {
            return res.send(report);
        } else {
            // Create a new report instance with request data
            // Save the new report to the database
            // Return the newly created report
            report = new Report(req.body);
            let reportCreated = await report.save();
            return res.send(reportCreated);
        }
    } catch (error) {
        // Handle errors and return a failure message
        return res.send("report Not generated !!");
    }
}

// Function to retrieve all reports for a specific patient by patient ID
module.exports.allReport = async function (req, res) {
    try {
        // Extract patient ID from request parameters
        // Find all reports for the given patient ID
        // Return the found reports
        const patientId = req.params.id;
        const allReport = await Report.find({ patientId: patientId });
        return res.send(allReport);
    } catch (error) {
        // Handle errors and return a failure message
        return res.send("error!!");
    }
}

// Function to find reports based on their status
module.exports.status = async function (req, res) {
    try {
        // Extract status from request parameters
        // Search for reports with the given status
        // Return the matching reports in JSON format
        const status = req.params.status;
        const result = await Report.find({ status: status });
        return res.json(200, {
            results: result,
        });
    } catch (error) {
        // Handle errors and return the error message
        return res.send(error);
    }
}
