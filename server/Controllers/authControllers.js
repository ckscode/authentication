import User from "../Models/user.js";
import sendEmail from "../utils/sendEmail.js";
import jwt from 'jsonwebtoken';

export const signup = async(req,res)=>{
try{
    const {name,email,password} = req.body

    const userExist=await User.findOne({email})
           if(userExist){
            return res.status(400).json({
                error:'email is taken'
            })
           }
  
           const token = jwt.sign(
            { name, email, password },
            process.env.JWT_ACCOUNT_ACTIVATION,
            { expiresIn: "10m" }
          );

          const emailData = {
            from: process.env.EMAIL_USER, // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
            to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE THE USER EMAIL (VALID EMAIL ADDRESS) WHO IS TRYING TO SIGNUP
            subject: "ACCOUNT ACTIVATION LINK",
            html: `
                      <h1>Please use the following link to activate your account</h1>
                      <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
                      <hr />
                      <p>This email may contain sensitive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `,
          };
       
          sendEmail(req, res, emailData);
 
    // const newUser = new User({ name, email, password });

    // await newUser.save()
        res.json({
            message: 'Email has been sent to signup the user'
        });

     
}catch(error){
     res.json({error:error.message});
}
   
}


export const accountActivation = async(req,res) =>{
try{
const {token} = req.body;

if(token){
    jwt.verify(token,process.env.JWT_ACCOUNT_ACTIVATION,function(err,data){
        if(err){
            console.log('jwt token expired',err);
            return res.status(401).json({
                error:'Expired link.Signup'
            })
        }

        const {name,email,password} = jwt.decode(token)

        const user = new User({name,email,password})

         user.save()
         return res.json({message:"signup successful,please signin"})
    })
}
}catch(error){
    return res.json({error:error})
}
}


export const signin = async(req,res) =>{

}