import express from "express";
import userRouter from '../src/routes/user.routes.js'
import {authenticationMiddleware} from './middlewares/authentication.middleware.js'
import cookieParser from "cookie-parser";
  const app=express()

 app.use(express.json())
 app.use(cookieParser())
 app.use('/api/users',userRouter)




 export default app