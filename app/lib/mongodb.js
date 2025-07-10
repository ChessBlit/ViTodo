import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ViTodo"
        })
        console.log('MONGODB CONNECTED');
        
    } catch (error) {
        throw new Error("MONGODB CONNECTION FAILED" + error)
    }
};

export default connectDB;