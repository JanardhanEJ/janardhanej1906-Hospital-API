// Load environment variables from a .env file
require('dotenv').config();

// Import the Express framework
const express = require('express');

// Define the server port, using environment variable or default to 8000
const port = process.env.PORT || 8000;

// Import the database connection
const db = require('./config/mongoose');
const Doctor = require('./models/doctor'); // Import the Doctor model

// Create an instance of the Express application
const app = express();

// Middleware to parse JSON requests (ensures Express can handle JSON data)
app.use(express.json());

// Middleware to parse URL-encoded data (allows handling form submissions)
app.use(express.urlencoded({ extended: true }));

// Load and use the main router file for handling routes
app.use('/', require('./router/index'));

// Start the server and listen on the specified port
app.listen(port, (error) => {
    if (error) {
        console.log(error); // Log any errors if the server fails to start
    } else {
        console.log(`Server is running on port ${port}`); // Log success message
    }
});
