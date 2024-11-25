import express, { Express } from "express";
import dbConnection from "./config/dbConfig.js";
import routes from "./routes/postRoute.js";
import { MongoDao } from "./mongo/mongoDao.js";
import { instaLog } from "./utils/logUtils.js";

// Create an Express application
const app: Express = express();

// Connect to the MongoDB database
const connKey = process.env.CONNECTION_KEY as string;
const dao = new MongoDao(await dbConnection(connKey));

// Set up the server to listen on port 3000
app.listen(3000, () => {
    instaLog("Instabyte is listening");
});

// Serve static files from the 'uploads' directory
app.use(express.static("uploads"));

// Register routes
routes(app, dao);
