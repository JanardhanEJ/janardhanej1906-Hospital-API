require('dotenv').config(); // Load environment variables from a .env file

const mongoose = require('mongoose'); // Import mongoose for MongoDB interaction

// Retrieve the MongoDB connection string from environment variables
const dbURI = process.env.MONGO_URI;

console.log('Attempting to connect to MongoDB:', dbURI); // Debugging log to check the connection URI

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database :: MongoDB'); // Log success message if connection is successful
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message); // Log error message if connection fails
});

const db = mongoose.connection; // Get the default connection instance

// Listen for errors on the connection and log them
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Export the database connection for use in other modules
module.exports = db;
