import express from "express"
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
import { accountController } from "../controllers/account.controller.js"
const router=express.Router()

router.get('/',authenticationMiddleware,accountController)


export default router