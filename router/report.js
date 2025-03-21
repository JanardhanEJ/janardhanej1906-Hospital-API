const express = require('express');
const router = express.Router();
const auth = require('../config/auth');
const createReport = require('../controller/report');
router.post('/:id/create_report' ,auth.checkAuthentication, createReport.createReport);
router.get('/:id/all_report' ,auth.checkAuthentication, createReport.allReport);
router.get('/:status' , createReport.status);
module.exports = router;