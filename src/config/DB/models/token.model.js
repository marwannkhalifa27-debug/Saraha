import mongoose from "mongoose";


const refreshTokenSchema = new mongoose.Schema(
    {
        userId: {type: mongoose.Schema.Types.ObjectId, ref: "user", required: true},
        tokenHash: {type: String, required: true},
        expiresAt:{type:Date, required: true, expires: 0}
    },
    {
        timestamps: true
    }
)

export const refreshTokenModel = mongoose.model("refreshToken", refreshTokenSchema)