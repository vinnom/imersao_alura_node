import { Express } from "express";
import { json } from "express";
import cors from "cors";

// Import controllers with typed function signatures
import {
    listAllPosts, // (res: Response, dao: MongoDao) => void
    listPostById, // (req: Request, res: Response, dao: MongoDao) => void
    sendPost, // (req: Request, res: Response, dao: MongoDao) => void
    updatePost, // (req: Request, res: Response, dao: MongoDao) => void
    uploadImage, // (req: Request, res: Response, dao: MongoDao) => void
} from "../controllers/postsController.js";

import { MongoDao } from "../mongo/mongoDao.js";
import upload from "../config/multerConfig.js";

// Define CORS options with typed properties
const corsOptions: cors.CorsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
};

/**
 * Initializes Express routes with the provided server and DAO instance.
 * @param server The Express application instance.
 * @param dao The MongoDB data access object instance.
 */
const routes = (server: Express, dao: MongoDao): void => {
    server.use(json());
    server.use(cors(corsOptions));

    /**
     * GET /posts - Retrieves a list of all posts.
     * @param req The Express request object.
     * @param res The Express response object.
     */
    server.get("/posts", async (req: import("express").Request, res: import("express").Response) => {
        listAllPosts(res, dao);
    });

    /**
     * GET /posts/:id - Retrieves a post by its ID.
     * @param req The Express request object containing the post ID.
     * @param res The Express response object.
     */
    server.get("/posts/:id", async (req: import("express").Request, res: import("express").Response) => {
        listPostById(req, res, dao);
    });

    /**
     * POST /posts - Creates a new post.
     * @param req The Express request object containing the post data.
     * @param res The Express response object.
     */
    server.post("/posts", async (req: import("express").Request, res: import("express").Response) => {
        sendPost(req, res, dao);
    });

    /**
     * POST /upload - Uploads an image using Multer middleware.
     * @param req The Express request object containing the uploaded image.
     * @param res The Express response object.
     */
    server.post(
        "/upload",
        upload().single("image"),
        async (req: import("express").Request, res: import("express").Response) => {
            uploadImage(req, res, dao);
        },
    );

    /**
     * PUT /posts/:id - Updates an existing post.
     * @param req The Express request object containing the updated post data and ID.
     * @param res The Express response object.
     */
    server.put("/upload/:id", async (req: import("express").Request, res: import("express").Response) => {
        updatePost(req, res, dao);
    });
};

export default routes;
