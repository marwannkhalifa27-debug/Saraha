import { messageModel } from "../../DB/models/message.model.js"

export const sendMessages = async (req,res,next) => {
    try {
        const username = req.body
        await messageModel.create(username)
        return res.status(200).json({message:"Message sent successfully"})
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

export const getMessages = async (req,res,next) => {
    try {
        const messages = await messageModel.find()
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(500).json(error.message)
    }
}