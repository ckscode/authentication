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