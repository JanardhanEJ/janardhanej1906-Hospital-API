// Import the Patient model
const Patient = require("../models/patient");

// Import JWT for token generation
const jwt = require('jsonwebtoken');

// Function to register a new patient
module.exports.register = async function (req, res) {
    try {
        // Check if a patient with the given phone number already exists
        // If patient exists, return the existing patient data
        let checkpatient = await Patient.find({ phone: req.body.phone });
        if (checkpatient && checkpatient.length > 0) {
            return res.send(checkpatient);
        } else {
            // Create a new patient instance with request data
            // Save the new patient to the database
            checkpatient = new Patient(req.body);
            let addPatient = await checkpatient.save();

            // Generate a JWT token for the newly registered patient
            let pat = jwt.sign(addPatient, id);
            // Return the newly created patient data
            return res.send(addPatient);
        }
    } catch (error) {
        // Handle errors and return a failure message
        return res.send('error in registering Patient !!');
    }
}
