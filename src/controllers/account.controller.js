import { accountModel } from "../models/account.model.js";




export const  accountController=async (req,res)=>{

try {
    const user=req.user;
    const account=await accountModel.create({
        user:user._id
    })
    
    
    res.status(201).json({message:`Account created Successfully ${account}`})
} catch (error) {
    return res.status(500).json({message:`Internal server Error with error,${error}`})
}


}