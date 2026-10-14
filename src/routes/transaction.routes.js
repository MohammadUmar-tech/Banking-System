import express from "express"
import { authenticationMiddleware, systemUserMiddleware } from "../middlewares/authentication.middleware.js"
import { createTransaction,createInitialFundsTransaction } from "../controllers/transaction.controller.js"

const router=express.Router()



router.post('/',authenticationMiddleware,createTransaction)
router.post('/system/-intial-funds',systemUserMiddleware,createInitialFundsTransaction)

export default router