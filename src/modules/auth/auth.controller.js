import { Router } from "express";
import { login, register } from "./auth.service.js";


const authRouter = Router()

authRouter.post("/register", async (req,res,next) => {
    try {
        const result = await register(req.body)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})
authRouter.post("/login", async (req, res, next) => {
    try {
        const result = await login(req.body)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})

export default authRouter