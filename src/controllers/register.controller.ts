import type { Request, Response } from "express";
import { RegisterInput } from "../validators/auth.validator.js";
import { registerUserService } from "../services/auth.services.js";
import { generateAccessToken } from "../utils/jwt.js";

export const registerController = async (req: Request, res: Response) => {
  const data = req.body as RegisterInput;

  const user = await registerUserService(data);
  const token = generateAccessToken(user.id);
  res.status(201).json({
    success: true,
    message: "User Created Successfully",
    user,
    token,
  });
};
