import { MongoClient, ObjectId } from "mongodb";

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

    public async updatePost(id: string, post: Object) {
        const objId = ObjectId.createFromHexString(id);
        return this.client
            .db("imersaoBackendNode")
            .collection("posts")
            .updateOne({ _id: new ObjectId(objId) }, { $set: post });
    }
}

export { MongoDao };
