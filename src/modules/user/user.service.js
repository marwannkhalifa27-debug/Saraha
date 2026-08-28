import { userModel } from "../../DB/models/user.model.js"
import bcrypt from "bcrypt"

export const createUser = async(userData) => userModel.create(userData)
export const findUserByEmail = async (email) => userModel.findOne({email})

export const getUser = async(req,res,next) => {
    const userId = req.user.userId
    const result = await userModel.findById(userId)

    return res.status(200).json(result)
}