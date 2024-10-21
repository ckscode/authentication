import Razorpay from "razorpay";
import User from "../Models/user.js";
import crypto from "crypto"

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

export const order = async(req,res) =>{
    try{
        const razorpay = new Razorpay({
            key_id:process.env.RAZORPAY_KEY_ID,
            key_secret:process.env.RAZORPAY_KEY_SECRET
          });
    
          const options = req.body;
           const order = await razorpay.orders.create(options);
           
           if(!order){
            return res.status(500).send("error in order")
           }

           return res.send(order)
    }catch(error){
        console.log(error)
        return res.json({error:error})
    }

   
}


export const orderValidate = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const sha = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    //order_id + "|" + razorpay_payment_id
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const digest = sha.digest("hex");
    if (digest !== razorpay_signature) {
      return res.status(400).json({ msg: "Transaction is not legit!" });
    }
  
    return res.json({
      msg: "success",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  }