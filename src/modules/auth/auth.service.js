import { access } from "fs"
import { refreshTokenModel } from "../../DB/models/token.model.js"
import { userModel } from "../../DB/models/user.model.js"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/auth.utils.js"
import { findUserByEmail , createUser } from "../user/user.service.js"
import bcrypt from "bcrypt"
import crypto from "crypto"

const hashToken = (token) => {
    return crypto.createHash("sha256").update(token).digest("hex")
}

export const register = async({ email , password , fullName , username , age , phone , sex  }) => {
    const exists = await findUserByEmail(email)
    if(exists){
        throw new Error("This email is already registered")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const user = await createUser({ email , password:hashPassword , fullName , username , age , phone , sex , role: "user" })

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)


    
    await refreshTokenModel.create({
        userId: user._id,
        tokenHash:hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    return { accessToken , refreshToken }
}

export const login = async({ email , password }) => {
    const user = await findUserByEmail(email)
    if(!user){
        throw new Error ("Invalid email or password")
    }

    const match = await bcrypt.compare(password, user.password)
    if(!match){
        throw new Error ("Invalid email or password")
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    await refreshTokenModel.create({
        userId: user._id,
        tokenHash: hashToken(refreshToken),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 *60 * 1000)
    })

    return { accessToken , refreshToken}
}

export const refresh = async(refreshToken) => {
    if(!refreshToken){
        throw new Error("No refresh token provided")
    }

    const decoded = verifyRefreshToken(refreshToken)

    const stored = refreshTokenModel.findOne({
        userId: decoded.userId,
        tokenHash: hashToken(refreshToken),
        expiresAt: { $gt: new Date()}
    })

    if(!stored){
        throw new Error("Invalid token or expired")
    }

    const user = await userModel.findById(decoded.userId)
    const accessToken = generateAccessToken(user)

    return { accessToken }
}

export const logout = async(refreshToken) => {
    if(refreshToken){
        await refreshTokenModel.deleteOne({tokenHash: hashToken(refreshToken)})
    }
}