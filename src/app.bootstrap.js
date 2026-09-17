import "dotenv/config"
import express from "express"
import { connection } from "./config/DB/connectionDB.js"
import userRouter from "./modules/user/user.controller.js"
import authRouter from "./modules/auth/auth.controller.js"
import messageRouter from "./modules/message/message.controller.js"
import { loggerMiddleware } from "./middleware/logger.middleware.js"
import cors from "cors"
const app = express()

export const bootstrap = async () => {
    app.use(express.json(), cors())
    app.use(loggerMiddleware)

    await connection()

    app.use("/auth", authRouter)
    app.use("/users", userRouter)
    app.use("/message", messageRouter)
    
    app.get("/", (req,res,next) => {
        return res.status(200).json({message:"Welcome home!"})
    })
    app.use("{/*demo}", (req,res,next) => {
        return res.status(404).json({message:"Not found!"})
    })

    app.listen(process.env.port, () => console.log(`Server is running on port ${process.env.port}`))
}