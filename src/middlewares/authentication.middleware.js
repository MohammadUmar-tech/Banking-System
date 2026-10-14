import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import { refreshAccessAndRefreshToken } from "../controllers/user.controller.js";
export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "No token, unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    if (!decoded) {
      throw new Error("Unauthorized Request");
    }
    const user = await userModel
      .findById(decoded?._id)
      .select("-password -refreshToken");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid token - user not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Auth error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized - Token expired or invalid" });
  }
};

export const systemUserMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer", "");
  if (!token) {
    return res.status(400).json({
      message: "Unathorized Access",
    });
  }

  try {
    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY,
    );

    const user = await userModel
      .findOne({ _id: decoded._id })
      .select("+systemUser");
      console.log("SystemUser",user.systemUser);
    if (!user.systemUser) {
      return res.status(403).json({
        message: "Forbidden access, not a system user",
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized access, token is invalid",
    });
  }
};
