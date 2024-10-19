import nodemailer from 'nodemailer';
import dotenv from 'dotenv'


dotenv.config();
const sendEmail = async(req,res,emailData)=>{
    const transporter = nodemailer.createTransport({
      secure:true,
      host:'smtp.gmail.com',
      port: 465,
      auth:{
          user:process.env.EMAIL_USER,
          pass:process.env.EMAIL_PASS
      }
      });

          //send email
          transporter.sendMail(emailData, function (err, info) {
           
            if (err) {
              console.error("Error occurred: ", err.response);
              return res.status(500).send({ message: "Failed to send email", error: err });
            } else {
              console.log("Email sent: ", info.response);
              return res.status(200).send({ message: "Email sent successfully", info: info });
            }
          });
}


export default sendEmail;
