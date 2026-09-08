import { Router } from "express";
import { getMessages, sendMessages } from "./message.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { messageSchema } from "./message.validation.js";

const messageRouter = Router()

messageRouter.post("/:username", validate(messageSchema) , async (req,res) => {
    try {
        await sendMessages(req.params.username, req.body)
        return res.status(201).json({ message: "Message sent successfully" })
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
})
messageRouter.get("/", authenticate ,getMessages)

export default messageRouter