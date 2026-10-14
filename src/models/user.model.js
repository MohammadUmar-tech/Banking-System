import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email Already Exist"],
        trim:true,
        lowercase: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ]
    },
    name:{
        type:String,
        required:[true,"Name is Required for creating A account"],
    },
    password:{
        type:String,
        select:false,
        required:[true,"password is Required "],
        minlen:[6,"password should contain Atleast 6 character"]
    },
    refreshToken:{
        type:String,
    },
    systemUser:{
        type:Boolean,
        default:false,
        immutable:true,
        select:false
    }
},{
    timestamps:true
})




userSchema.pre('save',async function(next){
if(this.isModified('password')){
    const hash=await bcrypt.hash(this.password,10)
    this.password=hash
    return
}
return 
})


userSchema.methods.comparePassword=async function(password) {
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name
    },process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn:process.env.ACCESS_TOKEN_EPIREY})
}

userSchema.methods.generateRefreshToken= function(){
    return  jwt.sign({
        _id:this._id,

    },process.env.REFRESH_TOKEN_SECRET_KEY,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY})
}



const userModel=mongoose.model('user',userSchema)

export default userModel