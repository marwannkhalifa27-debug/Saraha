import { userModel } from "../../config/DB/models/user.model.js"
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
    const result = await userModel
        .findById(userId)
        .select("-password")

    return res.status(200).json(result)
}

export const updateAvatar = async (req,res,next) => {
    try {
        if(!req.file){
            const err = new Error("No file provided")
            err.status = 404
            throw err
        }
        const userId = req.user.userId
        const user = await userModel
            .findByIdAndUpdate(userId, { avatarUrl: req.file.path}, {new: true})
            .select("-password")
        
        return res.status(200).json(user)

    } catch (error) {
        return res.status(error.status || 500).json({message: error.message})
    }
}

export const updateProfile = async (req,res,next) => {
    try {
        const userId = req.user.userId
        const { fullName, sex, age, phone} = req.body
        const data = await userModel
            .findByIdAndUpdate(userId, {
                fullName,
                sex,
                age,
                phone
            }, {new: true})
            .select("-password")

        return res.status(200).json(data)
    } catch (error) {
        return res.status(error.status || 500).json({message: error.message})
    }
    
}

export const deleteProfile = async (req,res,next) => {
    try {
        const userId = req.user.userId
        const deleted = await userModel.findByIdAndDelete(userId)

        return res.status(200).json({message: "Profile has been deleted", deleted})
    }
    catch (error) {
        return res.status(error.status || 500).json({message: error.message})
    }
}