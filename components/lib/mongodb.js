import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ViTodo"
        })
        
    } catch (error) {
        throw new Error("MONGODB CONNECTION FAILED" + error)
    }
};

export default connectDB;