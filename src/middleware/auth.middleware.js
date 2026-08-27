import { verifyAccessToken } from "../utils/auth.utils.js"


export const authenticate = async (req,res,next) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if(!token){
        return res.status(401).json({message:"No token provided"})
    }

    try {
        const decoded = verifyAccessToken(token)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}