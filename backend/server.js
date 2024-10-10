import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDb from "./db/connectToMongoDb.js";
import { app, server } from "./socket/socket.js";


dotenv.config();
const corsOptions = {
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies)
};

app.use(cors(corsOptions));

const PORT = 3000;


// app.get("/",(req,res)=>{
//     res.send("hello world!!");
// })

app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);

server.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`server is on port ${PORT}`);
})