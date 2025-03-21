require('dotenv').config(); // Load environment variables
const express = require('express');
const port = process.env.PORT || 8000;
const db = require('./config/mongoose'); // Import the database connection
const Doctor = require('./models/doctor');
const app = express();

app.use(express.json()); // Ensure JSON parsing middleware is applied
app.use(express.urlencoded({ extended: true })); // Ensure URL-encoded parsing middleware is applied

app.use('/', require('./router/index'));

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is running");
    }
});
