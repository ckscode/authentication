import mongoose from "mongoose";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        max:32
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        lowercase:true
    },
    hashed_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:String,
        default:'subscriber'
    },
    resetPasswordLink:{
        type:String,
        default:''
    }
},{timestamps:true})


//settin hashed_password
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
})
.get(function(){
    return this._password
})


userSchema.methods = {
    authentication:function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword:function(password){
        if(!password) return ''
        try{
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');
        }catch(error){
            console.log(error)
        }
    },

    makeSalt:function(){
        return Math.round(new Date().valueOf() * Math.random()) + ''
    }
}

const User = mongoose.model('user',userSchema);

export default User;