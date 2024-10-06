import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDb from "./db/connectToMongoDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// app.get("/",(req,res)=>{
//     res.send("hello world!!");
// })

app.use(express.json()); //to parse the incoming requests with json payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth" , authRoutes);
app.use("/api/messages" , messageRoutes);
app.use("/api/users" , userRoutes);

app.listen(PORT,()=>{
    connectToMongoDb();
    console.log(`server is on port ${PORT}`);
})