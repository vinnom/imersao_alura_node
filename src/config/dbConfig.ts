import { MongoClient } from "mongodb";

export default async function dbConnection(connKey: string): Promise<MongoClient>{
    let client;

    try {
        client = new MongoClient(connKey)
        console.log("Connecting to MongoDB cluster...");
        await client.connect()
        console.log("Connected to MongoDB!");

        return client
    } catch(error) {
        console.error("Fail to connect to MongoDB!", error);
        process.exit()
    }
}