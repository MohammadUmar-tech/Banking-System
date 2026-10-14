import express from "express"
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { accountController,getAllUserAccountController,getAccountBalance } from "../controllers/account.controller.js"
const router=express.Router()

router.get('/',authenticationMiddleware,accountController)
router.get('/allAcount',authenticationMiddleware,getAllUserAccountController)
router.get('/balance/:accountId',getAccountBalance)

export default router