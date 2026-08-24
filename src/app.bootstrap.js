import express from "express"
const app = express()
const port = 5000

export const bootstrap = async () => {
    app.use(express.json())

    app.get("/", (req,res,next) => {
        return res.status(200).json({message:"Welcome home!"})
    })
    app.use("{/*demo}", (req,res,next) => {
        return res.status(404).json({message:"Not found!"})
    })

    app.listen(port, () => console.log(`Server is running on port ${port}`))
}