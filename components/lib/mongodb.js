import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
	try {
		if (isConnected) return;

		const db = await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "ViTodo",
		});
		isConnected = mongoose.connections[0].readyState === 1;
	} catch (error) {
		throw new Error("MONGODB CONNECTION FAILED" + error);
	}
};

export default connectDB;
