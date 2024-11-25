import { MongoClient, ObjectId, InsertOneResult, UpdateResult, WithId } from "mongodb";

/**
 * A class representing a MongoDB data access object (DAO).
 */
class MongoDao {
    /**
     * The MongoDB client instance.
     */
    private client: MongoClient;

    /**
     * Constructs a new MongoDao instance.
     *
     * @param client The MongoDB client instance.
     */
    constructor(client: MongoClient) {
        this.client = client;
    }

    /**
     * Retrieves all posts from the MongoDB database.
     *
     * @returns {Promise<Document[] | null>} A Promise that resolves to an array of posts or null if no posts are found.
     */
    public async getAllPosts() {
        return this.client.db("imersaoBackendNode").collection("posts").find().toArray();
    }

    /**
     * Retrieves a specific post by its ID.
     *
     * @param {string} id - The ID of the post to retrieve.
     * @returns {Promise<Document | null>} A Promise that resolves to the found post or null if not found.
     */
    public async getPostById(id: string) {
        const objectId = new ObjectId(id);
        return this.client.db("imersaoBackendNode").collection("posts").findOne({ _id: objectId });
    }

    /**
     * Inserts a new post into the MongoDB database.
     *
     * @param {Object} post - The post object to insert.
     * @returns {Promise<InsertOneResult>} A Promise that resolves to the insert result.
     */
    public async insertPost(post: Object): Promise<InsertOneResult> {
        return this.client.db("imersaoBackendNode").collection("posts").insertOne(post);
    }

    /**
     * Updates an existing post in the MongoDB database.
     *
     * @param {string} id - The ID of the post to update.
     * @param {Object} post - The updated post data.
     * @returns {Promise<UpdateResult>} A Promise that resolves to the update result.
     */
    public async updatePost(id: string, post: Object): Promise<UpdateResult> {
        const objectId = new ObjectId(id);
        return this.client.db("imersaoBackendNode").collection("posts").updateOne({ _id: objectId }, { $set: post });
    }
}

export { MongoDao };
