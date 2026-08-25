import express from "express"
import { connection } from "./DB/connectionDB.js"
import userRouter from "./modules/user/user.controller.js"
const app = express()
const port = 5000

export const bootstrap = async () => {
    app.use(express.json())

    await connection()

    app.use("/users", userRouter)
    app.get("/", (req,res,next) => {
        return res.status(200).json({message:"Welcome home!"})
    })
    app.use("{/*demo}", (req,res,next) => {
        return res.status(404).json({message:"Not found!"})
    })

    app.listen(port, () => console.log(`Server is running on port ${port}`))
}