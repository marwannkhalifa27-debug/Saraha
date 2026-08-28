import jwt from "jsonwebtoken"
import "dotenv/config"

export const generateAccessToken = (user) => {
    return jwt.sign(
        {userId: user._id, role: user.role},
        process.env.access_token_secret,
        {expiresIn: "1h"}
    )
}

export const generateRefreshToken = (user) => {
    return jwt.sign(
        {userId: user._id, role: user.role},
        process.env.refresh_token_secret,
        {expiresIn: "7d"}
    )
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.access_token_secret)
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.refresh_token_secret)
}

