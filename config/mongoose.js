require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const dbURI = process.env.MONGO_URI;

console.log('Attempting to connect to MongoDB:', dbURI); // Debugging log

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to Database :: MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
