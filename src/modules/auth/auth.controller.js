import { Router } from "express";
import { login, logout, refresh, register } from "./auth.service.js";
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
authRouter.post("/refresh", authenticate, async(req,res,next) => {
    try {
        await refresh(req.body.refreshToken)
        return res.status(200).json({message:"Refreshed token"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

authRouter.delete("/logout", authenticate, async (req,res,next) => {
    try {
        await logout(req.body.refreshToken)
        return res.status(200).json({message:"Logged out succussfully."})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
})

export default authRouter