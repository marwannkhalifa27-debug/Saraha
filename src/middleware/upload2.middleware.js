import fs from "fs"
import multer from "multer"

const uploadDir = "uploads/images"
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true})
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        const uniqueName = `${req.user.userId}-${Date.now()}${path.extname(file.originalname)}`
        cb(null, uniqueName)
    }
})

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"]
    if(allowedTypes.includes(file.mimetyoe)){
        cb(null, true)
    }
    else {
        cb(new Error("Only JPEG, PNG, and WEBP images are allowed"), false);
    }
}

export const upload = multer({
    storage, 
    fileFilter, 
    limits: { fileSize: 5 * 1024 * 1024 }
})