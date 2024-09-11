import nodemailer from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config();
const sendEmail = async(req,res,emailData)=>{
    const transporter = nodemailer.createTransport({
        service:'outlook',
        host: process.env.EMAIL_HOST,
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

          //send email
          transporter.sendMail(emailData,async function(err,info){
            try{
             console.log(info)
            }catch{
             console.log(err)
            }
            })
}


export default sendEmail;
