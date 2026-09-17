import express from "express";
import {createServer} from "node:http";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import connectToSocket from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";

const app=express();
const server=createServer(app);
const io=connectToSocket(server);

app.set("port",process.env.PORT || 8000);

// app.get("/home",(req,res)=>{
//     // return res.json({"hello":"world"});
//     res.send("Hello");
// })

app.use(cors());
app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:"true"}));

app.use("/api/v1/users",userRoutes);


const start=async()=>{
    const connectiondb=await mongoose.connect(process.env.MONGO_URL);
    console.log("Mongo connected to DB Host");
    server.listen(app.get("port"),()=>{
        console.log("Listening to port 8000");
   })
}
start();