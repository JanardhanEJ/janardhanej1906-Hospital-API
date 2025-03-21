const express = require('express');
const router = express.Router();
const doctor = require('../controller/index');

// Middleware to log request processing time
router.use('/register', (req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`POST /register took ${duration}ms`);
    });
    next();
});

router.post('/register', doctor.Register);
router.get('/login', doctor.Login);
module.exports = router;