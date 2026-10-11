import express from "express"
import {userRegisterController,userLoginController,refreshAccessAndRefreshToken, logOutController} from '../controllers/user.controller.js'
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
const router =express.Router()


router.post('/register',userRegisterController)
router.post('/login',userLoginController)
// router.post('/refresh-token', refreshAccessAndRefreshToken);
router.get('/logout',authenticationMiddleware,logOutController)
export default router