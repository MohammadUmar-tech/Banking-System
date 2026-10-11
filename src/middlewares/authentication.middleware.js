import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import {refreshAccessAndRefreshToken} from '../controllers/user.controller.js'
export const authenticationMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ message: "No token, unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        if(!decoded){
            throw new Error("Unauthorized Request")
        }
        const user = await userModel.findById(decoded?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({ message: "Invalid token - user not found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Auth error:", error.message);
        return res.status(401).json({ message: "Unauthorized - Token expired or invalid" });
    }
    
};
