import { redisClient } from "../config/redis/redisConnection.js";


export const rateLimitMessages = (limit = 5, windowSeconds = 60) => {
    return async (req,res,next) => {
        try {
            const key = `rateLimit:messages:${req.ip}`
            const current = await redisClient.incr(key)

            if(current === 1){
                await redisClient.expire(key, windowSeconds)
            }
            if(current > limit){
                return res.status(429).json({message:"Too many messages, try again later."})
            }

            next()
        } catch (error) {
            console.error("Redis error, failing open:", error.message);
            next();
        }
    }
}