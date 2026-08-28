import { Router } from "express";
import { createUser, getUser } from "./user.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.post("/", createUser)
userRouter.get("/me", authenticate, getUser)
export default userRouter