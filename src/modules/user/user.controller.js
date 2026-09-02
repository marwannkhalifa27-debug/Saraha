import { Router } from "express";
import { createUser, getUser, testUpload } from "./user.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";

const userRouter = Router()

userRouter.post("/", createUser)
userRouter.get("/me", authenticate, getUser)
userRouter.post("/avatar", upload.single('avatar'), testUpload)
export default userRouter