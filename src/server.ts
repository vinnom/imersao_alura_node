import express from "express";
import { MongoClient } from "mongodb";
import dbConnection from "./config/dbConfig.js";
import routes from "./config/routes/postRoute.js";
import { MongoDao } from "./mongo/mongoDao.js";


const server = express();
const connKey = process.env.CONNECTION_KEY as string
const dao = new MongoDao(await dbConnection(connKey))

server.listen(3000, () => {
    console.log("Instabyte is listening");
});

routes(server, dao)
