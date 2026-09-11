import { z } from "zod";


export const messageSchema = z.object({
    title:z.string().min(2).max(15),
    content:z.string().min(2).max(100)
})