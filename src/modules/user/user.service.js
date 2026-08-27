import { userModel } from "../../DB/models/user.model.js"
import bcrypt from "bcrypt"

export const createUser = async(userData) => userModel.create(userData)
export const findUserByEmail = async (email) => userModel.findOne({email})