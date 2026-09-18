import { Router } from "express";
import { createUser, deleteProfile, getUser, testUpload, updateProfile } from "./user.service.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { upload } from "../../middleware/upload.middleware.js";
import { validate } from "../../middleware/validation.middleware.js";
import { updateUserSchema } from "./user.validation.js";

const userRouter = Router()

userRouter.get("/me", authenticate, getUser)
userRouter.post("/avatar",authenticate ,upload.single('avatar'), testUpload)
userRouter.patch("/me", authenticate, validate(updateUserSchema), updateProfile)
userRouter.delete("/me", authenticate, deleteProfile)
export default userRouter