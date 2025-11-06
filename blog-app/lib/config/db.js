import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let isConnected = false; // Track the connection status

export const connectDB = async () => {
    if (isConnected) {
        console.log("MongoDB already connected");
        return;
    }

    try {
        const db = await mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
        });

        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB");
    }
};
