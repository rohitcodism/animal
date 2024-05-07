import mongoose from "mongoose";

export const connectDb = async() => {
    try {
        const connectionInstance = await mongoose.connect("mongodb+srv://rohitpaulhhs04:TVSP4o7E8bvpOedA@cluster0.dmup9xz.mongodb.net/")

        console.log("MongoDb Connected Successfully.");
    } catch (error) {
        console.log("Database connection failed.", error)
        process.exit(1)
    }
}