import { MongoClient } from "mongodb";
import { instaLog } from "../utils/logUtils.js";

export default async function dbConnection(connKey: string): Promise<MongoClient> {
    let client;

    try {
        client = new MongoClient(connKey);
        instaLog("Connecting to MongoDB cluster...");
        await client.connect();
        instaLog("Connected to MongoDB!");

        return client;
    } catch (error) {
        console.error("Fail to connect to MongoDB!", error);
        process.exit();
    }
}
