import mongoose from "mongoose";

const connectToMongoDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("error connecting mongodb",error.message);
    }
}

export default connectToMongoDb;