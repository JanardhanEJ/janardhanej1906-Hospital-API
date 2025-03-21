const mongoose = require('mongoose');
const patient = new mongoose.Schema({
    phone: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
}, { timestamps: true });
const Patient = mongoose.model('Patient', patient);
module.exports = Patient;