const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');
// this is welcome router function
module.exports.home = async function (req, res) {
    return res.send("<h1>welcome to hospital api || </h1>");
}
// this is register function
module.exports.Register = async function (req, res) {
    try {
        let doctorPresent = await Doctor.find({ email: req.body.email });
        let doctorRegister = doctorPresent;
        if (doctorPresent.length == 0) {
            doctorPresent = new Doctor(req.body);
            doctorRegister = await doctorPresent.save();
        }
        return res.status(200).json({ // Fixed response method
            message: "Doctor Register!!",
            doctor: doctorRegister
        });
    } catch (error) {
        return res.status(500).json({ // Added proper error response
            message: "Error in registration !!",
            error: error.message
        });
    }
}

module.exports.Login = async function token(req, res) {
    try {
        const checkDoctor = await Doctor.findOne({ email: req.body.email });
        if (checkDoctor) {
            let token = jwt.sign(checkDoctor.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' }); // Set token expiry to 1 hour
            console.log('Generated Token:', token); // Log the generated token
            return res.status(200).json({
                message: "Login Successfully !!",
                token: token
            });
        } else {
            return res.status(401).json({
                message: "Email or Password are not correct !!"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error in Login !!",
            error: error.message
        });
    }
};