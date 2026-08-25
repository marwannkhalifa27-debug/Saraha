import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        age: {
            type: Number,
            required: true
        },
        sex: {
            type: String,
            enum: ["male", "female"],
            default: "male"
        },
        email: {
            type: String,
            requried: true,
            unique: true
        },
        password: { 
            type: String, 
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const userModel = mongoose.model("user", userSchema)