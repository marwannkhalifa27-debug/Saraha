import { messageModel } from "../../config/DB/models/message.model.js"
import { findUserByUsername } from "../user/user.service.js"



export const sendMessages = async (username, { title , content }) => {
    const receiver = await findUserByUsername(username)
    if(!receiver){
        const err = new Error("User not found")
        err.status = 404
        throw err
    }

    const message = await messageModel.create({
        title,
        content,
        receiverId:receiver._id
    })
    return message
}

export const getMessages = async (receiverId, page, limit) => {
    
    const skip = (page - 1) * limit

    const messages = await messageModel
        .find({ receiverId })
        .sort({ createdAt: -1})
        .skip(skip)
        .limit(limit)

    return messages
}

export const isRead = async (receiverId, messageId) => {
    const message = await messageModel
        .findOneAndUpdate({ _id: messageId, receiverId }, { isRead: true})

    if(!message){
        const err = "Message not found"
        err.status = 404
        throw err
    }
    return message
}

export const deleteMessage = async(receiverId, _id) => {
    const deletedMessage = await messageModel.findOneAndDelete({ _id: messageId, receiverId  })
    if(!deletedMessage){
        const err = "Message not found"
        err.status = 404
        throw err
    }
    return deletedMessage
}