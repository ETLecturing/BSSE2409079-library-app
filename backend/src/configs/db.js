const { MongoClient } = require("mongodb");

let client;
let db;

async function connectDB() {
    if (db) return db;

    try {
        client = new MongoClient(process.env.MONGO_URI);

        await client.connect();
        console.log("Connected to MongoDB");

        db = client.db(process.env.DB_NAME);
        console.log(`Now using database: ${db.databaseName}`);
        return db;

    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error("Database not initialized. Call connectDB() first.");
    }
    return db;
}

async function closeDB() {
    if (client) {
        await client.close();
        console.log("MongoDB connection closed.");
    }
}

module.exports = { connectDB, getDB, closeDB };