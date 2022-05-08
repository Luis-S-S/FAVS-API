const mongoose = require('mongoose');

async function connectDB() {
    const mongoURI = process.env.MONGO_URI;
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
        process.exit(1)
    }
}

module.exports = connectDB;