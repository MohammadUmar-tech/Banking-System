import mongoose from "mongoose"

const blackListSchema=new mongoose.Schema({
    token:{
        type:String,
        required :[true,"Token is Required to Blacklist"],
        unique:[true,"Token already Exist"]

    }
},{timestamps:true})

blackListSchema.index({createdAt:1},
    {
    expireAfterSeconds: 60 * 60 * 24 * 3
})

export const  blackListModel=mongoose.model('blacklist',blackListSchema)