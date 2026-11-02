import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign(
    {
      sub: userId,
    },
    env.JWT_SECRET,
    {
      algorithm: "HS256",
      expiresIn: "1h",
    },
  );
};