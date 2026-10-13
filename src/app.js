import express from "express";
import userRouter from '../src/routes/user.routes.js'
import {authenticationMiddleware} from './middlewares/authentication.middleware.js'
import cookieParser from "cookie-parser";
import accountRouter from './routes/account.routes.js'
import transactionRouter from './routes/transaction.routes.js'
  const app=express()

 app.use(express.json())
 app.use(cookieParser())
 app.use('/api/users',userRouter)
 app.use('/api/account',accountRouter)
 app.use('/api/transaction',transactionRouter)
 

 export default app