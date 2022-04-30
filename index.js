const express = require("express");
const momgoose = require("mongoose");
const router = require("./router");

const app = express();

app.use(express.json());
app.use("/auth", router);


const start = async () => {
    try {
        await momgoose.connect("mongodb://localhost:27017/jwtdb")
     app.listen(3000, () => {
         console.log("server started")
     })
    }
    catch(e) {
     console.log(e)
    }
}

start();