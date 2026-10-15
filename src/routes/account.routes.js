import express from "express"
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { accountController,getAllUserAccountController,getAccountBalance } from "../controllers/account.controller.js"
import { rateLimtterMiddlware } from "../middlewares/rateLimiter.middleware.js"
const router=express.Router()

router.get('/',authenticationMiddleware,rateLimtterMiddlware,accountController)
router.get('/allAcount',authenticationMiddleware,rateLimtterMiddlware,getAllUserAccountController)
router.get('/balance/:accountId',rateLimtterMiddlware,getAccountBalance)

export default router