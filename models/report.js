// Import mongoose for MongoDB interactions
const mongoose = require('mongoose');

// Define the schema for the Report model
const report = new mongoose.Schema({
    // Name or identifier of the doctor who created the report
    createdBy: {
        type: String,
        require: true
    },
    // Reference to the Patient model
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `Patient` // Establish relationship with the Patient collection
    },
    // Status of the patient based on diagnosis
    status: {
        type: String,
        enum: ['Negative', 'Positive-Admit', 'Symptoms-Quratine', 'Travelled-Qurantine'], // Allowed values
        require: true
    },
    // Stores the date when the report was created
    createdOn: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true }); // Automatically creates 'createdAt' and 'updatedAt' timestamps

// Create the Report model from the schema
const Report = mongoose.model('Report', report);

// Export the model for use in other files
module.exports = Report;
