import z from "zod";


export const messageSchema = z.object({
    title:z.string().min(2).max(15).required(),
    content:z.string().min(2).max(100).required()
})