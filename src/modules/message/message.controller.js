import { Router } from "express";
import { deleteMessage, getMessages, isRead, sendMessages } from "./message.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { messageSchema } from "./message.validation.js";
import { rateLimitMessages } from "../../middleware/rateLimiting.middleware.js";

const messageRouter = Router()

messageRouter.post("/:username", rateLimitMessages(5, 60), validate(messageSchema) , async (req,res) => {
    try {
        await sendMessages(req.params.username, req.body)
        return res.status(201).json({ message: "Message sent successfully" })
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
})
messageRouter.get("/", authenticate , async (req,res,next) => {
    try {
        const receiverId = req.user.userId

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 2

        const messages = await getMessages(receiverId, page, limit)
        return res.status(200).json(messages)
    } catch (error) {
        return res.status(error.status || 500).json(error.message)
    }
})

messageRouter.patch("/:messageId/read", authenticate, async(req,res,next) => {
    try {
        const receiverId = req.user.userId
        const messageId = req.params._id

        const message = await isRead(receiverId, messageId)
        return res.status(200).json(message)
    } catch (error) {
        return res.status(error.status || 500).json(error.message)
    }
})

messageRouter.delete("/:messageId", authenticate, async (req,res,next) => {
    try {
        const receiverId = req.user.userId
        const messageId = req.params._id

        const deletedMessage = await deleteMessage(receiverId, messageId)
        return res.status(200).json({message: "Message has been deleted", deletedMessage})
    } catch (error) {
        return res.status(error.status || 500).json(error.message)
    }
})

export default messageRouter