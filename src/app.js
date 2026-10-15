import express from "express";
import userRouter from '../src/routes/user.routes.js'
import {authenticationMiddleware} from './middlewares/authentication.middleware.js'
import cookieParser from "cookie-parser";
import accountRouter from './routes/account.routes.js'
import transactionRouter from './routes/transaction.routes.js'
import cors from 'cors'
import { Redis } from "ioredis";
  const app=express()

 app.use(express.json())
 app.use(cookieParser())
 app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
export const redis=new Redis(process.env.REDIS_URL)
 app.use('/api/users',userRouter)
 app.use('/api/accounts',accountRouter)
 app.use('/api/transactions',transactionRouter)
 

 export default app