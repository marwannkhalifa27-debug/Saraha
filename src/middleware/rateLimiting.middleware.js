import { Redis } from "@upstash/redis";


const rateLimiting = (limit = 5, windowSeconds = 60) => {
    return async (req,res,next) => {
        
    }
}