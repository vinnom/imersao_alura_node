import express from "express";

const server = express();
server.use(express.json())

const posts = [
    {
        id: 0,
        descricao: "Frieren dormindo 1",
        imageUrl: "https://i.imgur.com/BehiYiC.png"
    },
    {
        id: 1,
        descricao: "Frieren dormindo 2",
        imageUrl: "https://i.imgur.com/OJmyRsA.jpeg"
    },
    {
        id: 2,
        descricao: "Frieren dormindo 3",
        imageUrl: "https://i.imgur.com/WXmAd6e.jpeg"
    }
]

function getPostBtId(postId: String) {
    return posts.findIndex((post) => {
        return post.id === Number(postId)
    })
}

server.listen(3000, () => {
    console.log("Instabyte is listening");
});

server.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

server.get("/posts/:id", (req, res) => {
    const index = getPostBtId(req.params.id)
    res.status(200).json(posts[index]);
})
