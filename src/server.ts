import express from "express";
import dbConnection from "./config/dbConfig.js";
import routes from "./config/routes/postRoute.js";
import { MongoDao } from "./mongo/mongoDao.js";
import instaLog from "./utils/logUtils.js";

const server = express();
const connKey = process.env.CONNECTION_KEY as string;
const dao = new MongoDao(await dbConnection(connKey));

server.listen(3000, () => {
    instaLog("Instabyte is listening");
});

routes(server, dao);
