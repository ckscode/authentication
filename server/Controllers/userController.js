import User from "../Models/user.js";

export const read = async(req,res) =>{
    try{
      
        const userId = req.params.id;
        const userExists = await User.findById(userId).select('-hashed_password -salt');
      
        if(!userExists){
            return res.status(404).json({message:'User Not found'});
        }

        return res.json({status:true,data:userExists})
    }catch(error){
        return res.json({error:error.message});
    }
    
}

export const update = async(req,res) =>{
    // console.log(req.auth,'here')
    try{
        const {name,password} = req.body;
        if (!req.auth) {
            return res.status(401).json({ message: 'User not authenticated' });
          }
        const user = await User.findOne({_id:req.auth._id});
         
        if(!user){
            return res.status(404).json({message:'User Not found'});
        }

        if (!name) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.name = name;
        }
        
        if(password){
            if(password.length<6){
                return res.status(400).json({error:"Password must be more than 6 characters"})
            }else {
                user.password = password;
            }
           
        }

   
       const UpdatedUser = await user.save();
       
       if(UpdatedUser){
        UpdatedUser.hashed_password = undefined;
        UpdatedUser.salt = undefined;
        UpdatedUser.resetPasswordLink = undefined;
        return res.json({message:"User updated successfully",data:UpdatedUser})
       }
       
    }catch(error){
        return res.json({error:error.message});
    }

}