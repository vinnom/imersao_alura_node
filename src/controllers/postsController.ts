import fs from "fs"; // File system module
import path from "path"; // Path manipulation module
import { MongoDao } from "../mongo/mongoDao.js"; // Interface for MongoDB data access

// Utility functions for logging
import { instaError, instaLog } from "../utils/logUtils.js";

// Services for generating descriptions and alt text
import { geminiGenerateAltText, geminiGenerateDescription } from "../services/geminiService.js";

/**
 * Lists all posts from the database.
 *
 * @param {import('express').Response} res The Express response object
 * @param {MongoDao} dao The MongoDao instance for accessing data
 */
export async function listAllPosts(res: any, dao: MongoDao) {
    res.status(200).json(await dao.getAllPosts());
}

/**
 * Lists a single post by its ID from the database.
 *
 * @param {import('express').Request} req The Express request object
 * @param {import('express').Response} res The Express response object
 * @param {MongoDao} dao The MongoDao instance for accessing data
 */
export async function listPostById(req: any, res: any, dao: MongoDao) {
    const id = req.params.id as string; // Type cast to string for clarity
    res.status(200).json(await dao.getPostById(id));
}

/**
 * Creates a new post and inserts it into the database.
 *
 * @param {import('express').Request} req The Express request object
 * @param {import('express').Response} res The Express response object
 * @param {MongoDao} dao The MongoDao instance for accessing data
 */
export async function sendPost(req: any, res: any, dao: MongoDao) {
    const newPost: { descricao: string; imageUrl: string; alt: string } = req.body; // Type annotation for newPost
    instaLog(`newPost=${JSON.stringify(newPost, null, 3)}`);

    try {
        const insertedPost = await dao.insertPost(newPost);
        res.status(200).json(insertedPost);
    } catch (error) {
        instaError("Some server internal error when posting", res, error);
    }
}

/**
 * Uploads an image and creates a new post with the image information.
 *
 * @param {import('express').Request} req The Express request object
 * @param {import('express').Response} res The Express response object
 * @param {MongoDao} dao The MongoDao instance for accessing data
 */
export async function uploadImage(req: import("express").Request, res: import("express").Response, dao: MongoDao) {
    const file = req.file as Express.Multer.File;

    if (!file) {
        res.status(400).json({ error: "No file uploaded" });
    }
    const newPost = {
        descricao: "",
        imageUrl: file.originalname as string, // Type cast to string
        alt: "",
    };

    try {
        const insertedPost = await dao.insertPost(newPost);
        const updatedImage = `uploads/<span class="math-inline">\{\(await insertedPost\)\.insertedId\}</span>{path.extname(newPost.imageUrl)}`;
        fs.renameSync(file.path, updatedImage);
        res.status(200).json(insertedPost);
    } catch (error) {
        instaError("Some server internal error when uploading", res, error);
    }
}

/**
 * Updates an existing post with new information.
 *
 * @param {import('express').Request} req The Express request object
 * @param {import('express').Response} res The Express response object
 * @param {MongoDao} dao The MongoDao instance for accessing data
 */
export async function updatePost(req: any, res: any, dao: MongoDao) {
    const id = req.params.id;
    const imageExtension = path.extname(getImage(id));
    const imageUrl = `http://localhost:3000/${id}${imageExtension}`;
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}${imageExtension}`);
        const description = await geminiGenerateDescription(imageBuffer);
        const alt = await geminiGenerateAltText(imageBuffer);
        const post = {
            imageUrl: imageUrl,
            descricao: description,
            alt: alt,
        };

        const updatedPost = await dao.updatePost(id, post);
        res.status(200).json(updatedPost);
    } catch (error) {
        instaError("Some server internal error when uploading", res, error);
    }
}

function getImage(id: string): string {
    return fs.readdirSync("uploads/").find((image) => image.startsWith(id)) || "";
}
