import { Router } from "express";
import { getMessages, sendMessages } from "./message.service.js";

const messageRouter = Router()

messageRouter.post("/messages/:username", sendMessages)
messageRouter.get("/messages", getMessages)

export default messageRouter