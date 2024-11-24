import { Express } from "express";
import { json } from "express";
import { listAllPosts, sendPost, uploadImage } from "../controllers/postsController.js";
import { MongoDao } from "../mongo/mongoDao.js";
import upload from "../config/multerConfig.js";

const routes = (server: Express, dao: MongoDao) => {
    server.use(json());

    server.get("/posts", async (req, res) => {
        listAllPosts(res, dao);
    });

    server.post("/posts", async (req, res) => {
        sendPost(req, res, dao);
    });

    server.post("/upload", upload().single("image"), async (req, res) => {
        uploadImage(req, res, dao);
    });
};

export default routes;
