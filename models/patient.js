// Import mongoose for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for the Patient model
const patient = new mongoose.Schema({
    // phone number field
    phone: {
        type: String,
        require: true
    },
    // name field
    name: {
        type: String,
        require: true
    },
    // email field
    email: {
        type: String,
        require: true
    },
    // address field
    address: {
        type: String,
        require: true
    }
}, { timestamps: true }); // Automatically create 'createdAt' and 'updatedAt' timestamps

// Create the Patient model from the schema
const Patient = mongoose.model('Patient', patient);

// Export the model for use in other files
module.exports = Patient;
