import { messageModel } from "../../DB/models/message.model.js"
import { userModel } from "../../DB/models/user.model.js"


export const findUserByEmail = async (username) => await userModel.findOne({ username })

export const sendMessages = async (username, { title , content }) => {
    try {
    const receiver = await findUserByEmail(username)
    if(!receiver){
        throw new Error("User not found")
    }

    const message = await messageModel.create({
        title,
        content,
        receiverId:receiver._id
    })
    return message
    } 
    catch (error) {
        throw new Error(error.message)
    }
}

export const getMessages = async (req,res,next) => {
    try {
        const messages = await messageModel.find({ receiverId: req.user.userId })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}