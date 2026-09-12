import { Router } from "express";
import { getMessages, sendMessages } from "./message.service.js";
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
messageRouter.get("/", authenticate ,getMessages)

export default messageRouter