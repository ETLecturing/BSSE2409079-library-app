const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

module.exports = { connectDB };