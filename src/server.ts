import express from "express";

const server = express()

server.listen(3000, () => {
    console.log("Instabyte is listening");
    
})

server.get("/api", (req, res) => {
    res.status(200).send("API url working fine")
})