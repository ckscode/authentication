import User from "../Models/user.js"

export const signup = async(req,res)=>{
try{
    const {name,email,password} = req.body

    const userExist=await User.findOne({email})
           if(userExist){
            return res.status(400).json({
                error:'email is taken'
            })
           }
  
 
    const newUser = new User({ name, email, password });

    await newUser.save()
        res.json({
            message: 'Signup success! Please signin'
        });

     
}catch(error){
     res.json({error:error.message});
}
   

  

}
