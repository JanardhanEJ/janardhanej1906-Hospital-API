// Import mongoose for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for the Doctor model
const doctor = new mongoose.Schema({
    // name filed
    name: {
        type: String,
        require: true,
    },
    // email field
    email: {
        type: String,
        require: true,
        
    },
    // password field
    password: {
        type: String,
        require: true,
    }
}, { timestamps: true }); // Enable automatic creation of createdAt and updatedAt timestamps

// Create the Doctor model from the schema
const Doctor = new mongoose.model('Doctor', doctor);

// Export the model to be used in other files
module.exports = Doctor;
