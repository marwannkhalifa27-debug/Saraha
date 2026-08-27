import { Router } from "express";
import { createUser, getUser } from "./user.service.js";

const userRouter = Router()

userRouter.post("/", createUser)
userRouter.get("/me", getUser)
export default userRouter