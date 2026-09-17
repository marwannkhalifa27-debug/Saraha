import { userModel } from "../../config/DB/models/user.model.js"
import bcrypt from "bcrypt"
import { upload } from "../../middleware/upload.middleware.js"
import { redisClient } from "../../config/redis/redisConnection.js"

export const createUser = async(userData) => userModel.create(userData)
export const findUserByEmail = async (email) => userModel.findOne({email})
export const findUserByUsername = async (username) => {
    const cacheKey = `user:username:${username}`
    
    const cached = await redisClient.get(cacheKey)
    if(cached){
        return cached
    }

    const user = await userModel.findOne({ username })
    if(user){
        await redisClient.set(cacheKey, user, { ex: 300})
    }
    return user
}

export const getUser = async(req,res,next) => {
    const userId = req.user.userId
    const result = await userModel.findById(userId)

    return res.status(200).json(result)
}

export const testUpload = async(req,res,next) => {
    return res.status(200).json({ file: req.file })
}