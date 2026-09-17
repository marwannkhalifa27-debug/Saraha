import { Router } from "express";
import { login, logout, refresh, register, resendOTP, sendOTP, verifyOTP } from "./auth.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { registerSchema , loginSchema } from "../../modules/auth/auth.validation.js"


const authRouter = Router()

authRouter.post("/send-otp", async (req,res) => {
    try {
        await sendOTP(req.body.email)
        return res.status(200).json({ message: "OTP sent" });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message })
    }
})
authRouter.post("/verify-otp", async (req, res) => {
    try {
        await verifyOTP(req.body.email, req.body.otp);
        return res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
})

authRouter.post("/resend-otp", async (req, res) => {
    try {
        await resendOTP(req.body.email);
        return res.status(200).json({ message: "OTP resent" });
    } catch (error) {
        return res.status(error.status || 500).json({ message: error.message });
    }
})

authRouter.post("/register", validate(registerSchema),async (req,res,next) => {
    try {
        const result = await register(req.body)
        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})
authRouter.post("/login", validate(loginSchema) ,async (req, res, next) => {
    try {
        const result = await login(req.body)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(400).json({message:error.message})
    }
})
authRouter.post("/refresh", async(req,res,next) => {
    try {
        const result = await refresh(req.body.refreshToken)
        return res.status(200).json(result)
    } catch (error) {
        return res.status(401).json({message:error.message})
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