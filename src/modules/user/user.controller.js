import { Router } from "express";
import { createUser, getUser, testUpload } from "./user.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.post("/", createUser)
userRouter.get("/me", authenticate, getUser)
userRouter.post("/avatar", testUpload)
export default userRouter