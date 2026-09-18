import z from "zod";

export const updateUserSchema = z.object({
    fullName: z.string().min(2).max(50).optional(),
    age: z.number().min(18).max(60).optional(),
    phone: z.string().optional(),
    sex: z.enum(["male", "female"]).optional()
})