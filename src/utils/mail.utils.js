import nodemailer from "nodemailer";
import "dotenv/config"

const transporter = nodemailer.createTransport({
    host:'smtp.ethereal.email',
    port:587,
    auth:{
        user:process.env.ethereal_email_username,
        pass:process.env.ethereal_email_password
    },
    tls:{
        rejectUnauthorized: false
    }
})

transporter.verify((error, success) => {
    if(error){
        console.log(error.message)
    }
    if(success){
        console.log("SMTP connection is ready")
    }
})

export const sendMail = async ({ to , subject , html}) => {
    return transporter.sendMail({
        from: `"Saraha" <${process.env.ethereal_email_username}>`,
        to,
        subject,
        html
    })
}