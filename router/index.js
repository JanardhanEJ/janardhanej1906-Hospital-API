const express = require('express');
const router = express.Router();
const doctor = require('../controller/index');
const auth = require('../config/auth');
const reportController = require('../controller/report');

router.get('/', doctor.home);
router.use('/doctor', require('./doctor'));
router.use('/patients', require('./patient'));
router.use('/patients', require('./report'));
router.use('/reports', require('./report'));

// Example route for creating a report
router.post('/report/create', auth.checkAuthentication, reportController.createReport);

module.exports = router;
