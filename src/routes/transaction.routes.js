import express from "express"
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { createTransaction } from "../controllers/transaction.controller.js"

const router=express.Router()



router.post('/',authenticationMiddleware,createTransaction)

export default router