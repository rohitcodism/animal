import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)

        console.log("MongoDb Connected Successfully.");
    } catch (error) {
        console.log("Database connection failed.", error)
        process.exit(1)
    }
}