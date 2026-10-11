import app from "./src/app.js";
import dotenv from 'dotenv'
dotenv.config()
import {DataBaseConnecetion} from './src/config/dbConnect.js'


await DataBaseConnecetion(process.env.MONGODB_URI)
app.listen(process.env.PORT,()=>{
    console.log(`Server started at Port ${process.env.PORT}`);
    
})