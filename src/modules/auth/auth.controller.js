import { Router } from "express";
import { login, logout, register } from "./auth.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";


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

authRouter.delete("/logout", authenticate, logout)

export default authRouter