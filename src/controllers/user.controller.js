import userModel from "../models/user.model.js";
// import {generateAccessToken,generateRefreshToken} from '../utills/tokenGeneration.js'
import jwt from "jsonwebtoken"
import { sendEmailController } from "../services/email.js";
export const generateAccessAndRefreshToken=async (userId)=>{

try {
    const user=await userModel.findById(userId)
    if(!user){
        return new Error('User Not Found while Token generation')
    }
    const accessToken=user.generateAccessToken()
    const refreshToken=user.generateRefreshToken()
    user.refreshToken = refreshToken; 
    await user.save({ validateBeforeSave: false });
    return {accessToken,refreshToken}
    
} catch (error) {
    throw new Error(`Internal Server Error ${error}`)
}
}
export const refreshAccessAndRefreshToken=async (req,res) => {
    
   try {
     const incomingRefreshToken=req.cookies.refreshToken
 
     if(!incomingRefreshToken){
         return res.status(401).json({message:"Invalid Incomming Refresh Token"})
     }
     const decoded=jwt.verify(incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)
     const user=await userModel.findById(decoded._id)
     if(!user){
         return res.status(401).json({mesaage:"User not found Using RefreshToken "})
     }
     if(user.refreshToken!==incomingRefreshToken){
         throw new Error("Unathorized Request")
     }
    const {accessToken,refreshToken}= await generateAccessAndRefreshToken(user._id)
     
    const options={
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 15 * 60 * 1000 
        }
        const options1={
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 *24* 60* 60 * 1000 
        }
    
     return res.status(200).cookie('accessToken',accessToken,options).cookie('refreshToken',refreshToken,options1).json({message:"New token generated Successfully"})
   } catch (error) {
    return res.status(401).json({message:`${error}`})
   }

}
export const userRegisterController=async (req,res)=>{
    try {
        const {email,password,name}=req.body;
    
        const isExist=await userModel.findOne({email})
        if(isExist){
            return res.status(422).json({message:"User already exsist"})
        }
        const user=await userModel.create({
            email,name,password
        })
        console.log('Hello')
    
        const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
            const options={
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 
            }
            const options1={
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 *24* 60* 60 * 1000 
            }
            res.cookie('accessToken', accessToken, options)
            res.cookie('refreshToken',refreshToken,options1)
             
            
            await sendEmailController(user)
            
            
            res.status(201).json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            },
            accessToken
        })

    } catch (error) {
       return  res.status(500).json({message :`Internal server Error while register ${error}`})
    }
}
export const userLoginController=async (req,res)=>{
   try {
     const {email,password}=req.body;
 
     if(!email||!password){
         return res.status(400).json({mesaage:"Email and password are required"})
     }
 
     const user= await userModel.findOne({email}).select("+password")
     if(!user){
         return res.status(404).json({message:"User not found Please provide valid email "})
     }
 
     const isPasswordCorrect = await user.comparePassword(password);
         if (!isPasswordCorrect) {
             return res.status(401).json({ message: "Invalid password" });
         }
      const {accessToken,refreshToken}=await generateAccessAndRefreshToken(user._id)
         const options={
         httpOnly: true,
         secure: false,
         sameSite: 'lax',
         maxAge: 15 * 60 * 1000 
         }
         const options1={
         httpOnly: true,
         secure: false,
         sameSite: 'lax',
         maxAge: 7 *24* 60* 60 * 1000 
         }
         res.cookie('accessToken', accessToken, options)
         res.cookie('refreshToken',refreshToken,options1)
         res.status(201).json({
         user: {
             _id: user._id,
             email: user.email,
             name: user.name
         },
         accessToken
     })
 
   } catch (error) {
    res.status(500).json({message :`Internal server Error while login ${error}`})
   }
}
export const logOutController=async (req,res)=>{
    const user=await userModel.findById(req.user._id);
    user.refreshToken=undefined;
    user.save({validateBeforeSave:false});
        const options1={
         httpOnly: true,
         secure: false,
         sameSite: 'lax'
         }

        const options={
         httpOnly: true,
         secure: false,
         sameSite: 'lax',
         }
    return res.clearCookie('refreshToken',options1).clearCookie('accessToken',options).status(200).json({message:"user Logged out successfully"})
}