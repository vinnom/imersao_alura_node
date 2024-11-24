import fs from "fs";
import path from "path";
import { MongoDao } from "../mongo/mongoDao.js";
import { instaError, instaLog } from "../utils/logUtils.js";

export async function listAllPosts(res: any, dao: MongoDao) {
    res.status(200).json(await dao.getAllPosts());
}

export async function sendPost(req: any, res: any, dao: MongoDao) {
    const newPost = req.body;
    instaLog(`newPost=${JSON.stringify(newPost, null, 3)}`);

    try {
        const insertedPost = await dao.insertPost(newPost);
        res.status(200).json(insertedPost);
    } catch (error) {
        instaError("Some server internal error when posting", res, error);
    }
}

export async function uploadImage(req: any, res: any, dao: MongoDao) {
    const newPost = {
        descricao: "",
        imageUrl: req.file.originalname,
        alt: "",
    };

    try {
        const insertedPost = await dao.insertPost(newPost);
        const updatedImage = `uploads/${(await insertedPost).insertedId}.${path.extname(newPost.imageUrl)}`;
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(insertedPost);
    } catch (error) {
        instaError("Some server internal error when uploading", res, error);
    }
}
