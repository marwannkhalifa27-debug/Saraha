import { refreshTokenModel } from "../../config/DB/models/token.model.js"
import { userModel } from "../../config/DB/models/user.model.js"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/auth.utils.js"
import { findUserByEmail , createUser } from "../user/user.service.js"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { generateOTP } from "../../utils/otp.utils.js"
import { redisClient } from "../../config/redis/redisConnection.js"
import { sendMail } from "../../utils/mail.utils.js"

const OTP_TTL = 300
const RESEND_COOLDOWN = 60

export const sendOTP = async (email) => {
    const user = await findUserByEmail(email)
    if(!user){
        const err = new Error("No account found with this email!")
        err.status = 404
        throw err
    }
    const otp = generateOTP()

    await redisClient.set(`otp:${email}`, otp, {ex: OTP_TTL})

    await sendMail({
        to: email,
        subject: "Saraha verification code",
        html:`<p>Your verification code is <b>${otp}</b>. It expires in 5 minutes.</p>`
    })
}
export const verifyOTP = async (email, submittedOTP) => {
    const storedOTP = await redisClient.get(`otp:${email}`)
    if(!storedOTP){
        const err = new Error("Invalid OTP")
        err.status = 400
        throw err
    }
    if(storedOTP !== submittedOTP){
        const err = new Error("Incorrect OTP")
        err.status = 400
        throw err
    }
    await redisClient.del(`otp:${email}`)
    await userModel.updateOne({ email }, { isVerified: true })
}

export const resendOTP = async (email) => {
    const coolDownKey = `otp:cooldown:${email}`
    const onCoolDown = await redisClient.get(coolDownKey)

    if(onCoolDown){
        const err = new Error("Please wait before requesting another code");
        err.status = 429;
        throw err;
    }

    await sendOTP(email)
    await redisClient.set(coolDownKey, "1", { ex: RESEND_COOLDOWN })
}

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

    const stored = await refreshTokenModel.findOne({
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