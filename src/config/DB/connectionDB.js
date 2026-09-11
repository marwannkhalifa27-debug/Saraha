import mongoose from "mongoose";
import "dotenv/config"

export const connection = async () => {
    try {
        await mongoose.connect(process.env.mongo_uri)
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Failed to connect", error.message)
    }
}
