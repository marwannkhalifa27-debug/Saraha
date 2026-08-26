import { Router } from "express";
import { createUser } from "./user.service.js";

const userRouter = Router()

userRouter.post("/", createUser)

export default userRouter