import { MongoClient, WithId } from "mongodb";

class MongoDao {
    client: MongoClient

    constructor(client: MongoClient) {
        this.client = client
    }

    public async getAllPosts() {
        return await this.client.db("imersaoBackendNode").collection("posts").find().toArray()
    }
}

export { MongoDao }