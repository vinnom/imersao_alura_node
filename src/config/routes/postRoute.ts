import { Express } from "express"
import { json } from "express"
import { listAllPosts } from "../../controllers/postsController.js"
import { MongoDao } from "../../mongo/mongoDao.js"

const routes = (server: Express, dao: MongoDao) => {
    server.use(json())

    server.get("/posts", async (req, res) => { listAllPosts(req, res, dao) })
}

export default routes