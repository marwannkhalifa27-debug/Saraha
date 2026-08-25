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
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: { 
            type: String, 
            required: true
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
)

export const userModel = mongoose.model("user", userSchema)