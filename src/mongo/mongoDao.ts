import { MongoClient, WithId } from "mongodb";

class MongoDao {
    client: MongoClient;

    constructor(client: MongoClient) {
        this.client = client;
    }

    public async getAllPosts() {
        return this.client.db("imersaoBackendNode").collection("posts").find().toArray();
    }

    public async insertPost(post: Object) {
        return this.client.db("imersaoBackendNode").collection("posts").insertOne(post);
    }
}

export { MongoDao };
