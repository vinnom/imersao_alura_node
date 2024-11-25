import { MongoClient } from "mongodb";
import { instaLog } from "../utils/logUtils.js";

/**
 * Connects to a MongoDB database.
 *
 * @param {string} connKey The MongoDB connection string.
 * @returns {Promise<MongoClient>} A Promise that resolves to the MongoDB client.
 */
export default async function dbConnection(connKey: string): Promise<MongoClient> {
    try {
        const client = new MongoClient(connKey);
        instaLog("Connecting to MongoDB cluster...");
        await client.connect();
        instaLog("Connected to MongoDB!");
        return client;
    } catch (error) {
        console.error("Failed to connect to MongoDB!", error);
        process.exit(1); // Explicitly exit with a non-zero exit code
    }
}
