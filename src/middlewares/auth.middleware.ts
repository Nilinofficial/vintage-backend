import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
const token = req.cookies?.accessToken;

if (typeof token !== "string" || !token) {
  res.status(401).json({
    success: false,
    message: "Authentication required",
  });
  return;
}
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET, {
      algorithms: ["HS256"],
    });

    if (typeof decoded === "string" || typeof decoded.sub !== "string") {
      res.status(401).json({
        success: false,
        message: "Invalid token payload",
      });
      return;
    }
    req.userId = decoded.sub;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
