import { accountModel } from "../models/account.model.js";
import { redis } from "../app.js";



export const  accountController=async (req,res)=>{

try {
    const user=req.user;
    const account=await accountModel.create({
        user:user._id
    })
    await redis.del(`account:all:${user._id}`)
    res.status(201).json({message:`Account created Successfully ${account}`})
} catch (error) {
    return res.status(500).json({message:`Internal server Error with error,${error}`})
}


}


export const getAllUserAccountController=async(req,res)=>{


     try {

        const catched=await redis.get(`account:all:${req.user._id}`);
        const data=JSON.parse(catched)
        if(data){
             return res.status(200).json({message:"Account Fetched Successfully",
             "Accounts":data
         })
        }


         const user=req.user;
         const accounts=await accountModel.find({user:user._id});
         console.log(accounts)
         await redis.set(`account:all:${req.user._id}`,JSON.stringify(accounts))
         return res.status(200).json({message:"Account Fetched Successfully",
           "Accounts":`${accounts}`
         })
     } catch (error) {
        return res.status(400).json({message:`acount Fetching Problem${error}`})
     }
}

export const getAccountBalance=async(req,res)=>{
    try {
        const {accountId}=req.params;
        const account=await accountModel.findOne({_id:accountId});
    
        const balance=await account.getBalance();
        return res.status(200).json({message:`Account balance is ${balance}`})
    } catch (error) {
        return res.status(404).json({message:`bad Request error Occur ${error}`})
    }

}