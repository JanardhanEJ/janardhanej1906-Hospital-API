const Patient = require("../models/patient");
const jwt = require('jsonwebtoken');

module.exports.register = async function (req, res) {
    try {
        let checkpatient = await Patient.find({ phone: req.body.phone });
        if (checkpatient && checkpatient.length > 0) {
            return res.send(checkpatient);
        } else {
            checkpatient = new Patient(req.body);
            let addPatient = await checkpatient.save();
            let pat = jwt.sign(addPatient, id);
            return res.send(addPatient);
        }
    } catch (error) {
        return res.send('error in register!!');
    }
}