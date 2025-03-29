// Import Doctor model
const Doctor = require('../models/doctor');

// Import JWT for authentication
const jwt = require('jsonwebtoken');

// Welcome route handler
module.exports.home = async function (req, res) {
    const isLocalhost = req.headers.host.includes('localhost:3000');
    return res.send(`
        <br/>
        <h1><center>Welcome to Hospital API.. !! </center></h1>
        <br/>
        <p><h3>   Click <a href="${isLocalhost ? 'http://localhost:3000/doc/index.html' : 'https://janardhanej1906-Hospital-API.onrender.com/doc/index1.html'}">here</a> to view the documentation ${isLocalhost ? '(LocalHost URL)' : '(Render URL)'}</h3></p>
    `);
}

// Doctor Registration Function
module.exports.Register = async function (req, res) {
    try {
        // Check if a doctor with the given email already exists
        let doctorPresent = await Doctor.find({ email: req.body.email });
        let doctorRegister = doctorPresent;

        // If no doctor is found, create a new doctor entry
        // Save the new doctor to the database
        if (doctorPresent.length == 0) {
            doctorPresent = new Doctor(req.body);
            doctorRegister = await doctorPresent.save();
        }

        // Send success response
        return res.status(200).json({
            message: "Doctor Registered Successfully !!",
            doctor: doctorRegister
        });
    } catch (error) {
        return res.status(500).json({
            // Handle server errors
            message: "Error in Doctor Registration !!",
            error: error.message
        });
    }
}

// Doctor Login Function
module.exports.Login = async function token(req, res) {
    try {
        // Find a doctor using the provided email
        const checkDoctor = await Doctor.findOne({ email: req.body.email });

        // If doctor exists, generate a JWT token for authentication
        if (checkDoctor) {
            let token = jwt.sign(checkDoctor.toJSON(), process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour
            
            console.log('Generated Token:', token); // Log the generated token for debugging
            
            // Check if the entered password matches the password in the database
            if (req.body.password !== checkDoctor.password) {
                return res.status(401).json({
                    message: "Email or Password is incorrect !!"
                });
            }

            // Send success response with token
            return res.status(200).json({
                message: "Doctor Login Successfull !!",
                token: token
            });
        } else {
            // Unauthorized response if doctor is not found
            return res.status(401).json({
                message: "Email or Password is incorrect !!"
            });
        }
    } catch (error) {
        // Handle server errors
        return res.status(500).json({
            message: "Error in Doctor Login !!",
            error: error.message
        });
    }
};
