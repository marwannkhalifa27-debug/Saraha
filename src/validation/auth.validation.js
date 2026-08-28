import { z } from "zod"

const registerSchema = z.object(
    {
        fullName:z.string().min(2).max(50),
        username:z.string().min(2).max(50),
        email:z.string().email(),
        password:z.string().min(8, "Password must at least be 8 characters"),
        sex:z.enum(["male", "female"]).optional(),
        age:z.number().min(18).max(60),
        phone:z.string()
    }
)