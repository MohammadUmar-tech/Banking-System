import mongoose from "mongoose";

export async function DataBaseConnecetion(URI) {
    

     try {
       const connection= await mongoose.connect(URI)
       if(connection){
        console.log('Database Connected Sucessfully')
       }
        
     } catch (error) {
        console.log(`Error Occur while making a connection with mongodb data base ${error}`);
        process.exit(1)
     }
}