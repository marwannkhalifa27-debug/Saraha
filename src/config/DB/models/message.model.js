import mongoose from "mongoose";


const messageSchema = new mongoose.Schema(
    {
        title: { 
            type: String,
            required: true
        },
        content: { 
            type: String,
            required: true,
            minLength:1,
            maxLength:500
        },
        receiverId: {
            type: mongoose.Types.ObjectId,
            ref: "user"
        },
        isRead: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

export const messageModel = mongoose.model("message", messageSchema)