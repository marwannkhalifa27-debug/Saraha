import { messageModel } from "../../config/DB/models/message.model.js"
import { userModel } from "../../config/DB/models/user.model.js"


export const findUserByUsername = async (username) => await userModel.findOne({ username })

export const sendMessages = async (username, { title , content }) => {
    const receiver = await findUserByUsername(username)
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

export const getMessages = async (req,res,next) => {
    try {
        const messages = await messageModel.find({ receiverId: req.user.userId })
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}