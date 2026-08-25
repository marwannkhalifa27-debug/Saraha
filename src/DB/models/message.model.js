import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true
        },
        content: { 
            type: String,
            required: true
        },
        recieverId: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        isRead: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

export const messageModel = mongoose.model("message", messageSchema)