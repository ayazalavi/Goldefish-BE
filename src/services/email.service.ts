import { user } from "@/interfaces/user.interface";
import config from "config";
const nodemailer = require("nodemailer");

export default class EmailService {
  
    public static async sendForgotEmail(userData: user, password: string): Promise<boolean> {
        var name = userData.name.fullName;
        const { email, password: pwd } = config.get('email');
        var from = `Goldefish<${email}>`;
        var message = "Your password is " + password;
        var to = userData.email;

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: email, // generated ethereal user
              pass: pwd, // generated ethereal password
            },
        });
        
        var mailOptions = {
            from: from,
            to: to, 
            subject: 'Forgot password',
            text: message
        }

        let info = await transporter.sendMail(mailOptions);
        return info && info.messageId !== undefined;
    }
    
}