import nodemailer from "nodemailer";
import "dotenv/config"

const transporter = nodemailer.createTransport({
    host:'smtp.ethereal.email',
    port:587,
    auth:{
        user:process.env.ethereal_mail_username,
        pass:process.env.ethereal_mail_password
    }
})

export const sendMail = async ({ to , subject , html}) => {
    return transporter.sendMail({
        from: `"Saraha <${process.env.ethereal_mail_username}>`,
        to,
        subject,
        html
    })
}