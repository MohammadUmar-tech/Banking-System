import dotenv from "dotenv";
dotenv.config();
import Redis from "ioredis";
import { Worker } from "bullmq";
import { sendEmailController } from "../services/email.js";
const connection=new Redis(process.env.REDIS_URL,{
    maxRetriesPerRequest :null
})

export const worker=new Worker('emailQueue', async(job)=>{

    const data=job.data
    console.log('Job Started')
    await sendEmailController(data)
    console.log("Job ended")
    
},{connection})


