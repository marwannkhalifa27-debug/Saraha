import mongoose from "mongoose";

export const connection = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/SARAHA")
        console.log("DB connected successfully")
    } catch (error) {
        console.log("Failed to connect", error.message)
    }
}
