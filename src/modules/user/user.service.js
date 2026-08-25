import { userModel } from "../../DB/models/user.model.js"


export const createUser = async (req,res,next) => {
    const { fullName, username, age, sex, email , password} = req.body
    try {
        const user = await userModel.create({ fullName, username, age, sex, email , password})
        return res.status(201).json({
            message:"New user added",
            user
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}