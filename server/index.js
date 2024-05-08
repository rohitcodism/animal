import { connectDb } from "./utils/connectDb.js";
import { app } from "./app.js";

connectDb()
.then(() => {
    app.on("error", (error) => {
        console.log(`Server error ${error}`);
        throw error;
    })

    app.listen(8000,() => {
        console.log("Server is running on port 8000")
    })
})
.catch((error) => {
    console.log(`MongoDB connection error ${error}`);
})