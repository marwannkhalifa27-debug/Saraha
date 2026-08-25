import { userModel } from "../../DB/models/user.model.js"
import bcrypt from "bcrypt"



export const createUser = async (req,res,next) => {
    const { fullName, username, age, sex, email , password, role} = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({ fullName, username, age, sex, email , password: hashedPassword, role})
        return res.status(201).json({
            message:"New user added",
            user: {
                fullName: user.fullName,
                username: user.username,
                sex:user.sex,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}