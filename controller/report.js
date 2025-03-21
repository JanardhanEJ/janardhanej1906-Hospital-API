const Report = require('../models/report');


module.exports.createReport = async function (req, res) {
    try {
        let report = await Report.find(req.body);
        if (report && report.length > 0) {
            return res.send(report);
        } else {
            report = new Report(req.body);
            let reportCreated = await report.save();
            return res.send(reportCreated);
        }


    } catch (error) {
        return res.send("report Not generated !!");
    }
}
// find on the id
module.exports.allReport = async function (req, res) {
    try {
        const patientId = req.params.id;
        const allReport = await Report.find({ patientId: patientId });
        return res.send(allReport);
    } catch (error) {
        return res.send("error");
    }
}
//search on status
module.exports.status = async function (req, res) {
    try {
        const status = req.params.status;
        const result = await Report.find({ status: status });
        return res.json(200, {
            results: result,

        });
    } catch (error) {
        return res.send(error);
    }
}