import { MongoDao } from "../mongo/mongoDao.js";

export async function listAllPosts(req: any, res: any, dao: MongoDao) {
    res.status(200).json(await dao.getAllPosts());
}
