import type { Request, Response } from "express";
import { LoginInput } from "../validators/auth.validator.js";
import { loginService } from "../services/auth.services.js";

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body as LoginInput;

  const token = await loginService(email, password);

  if (!token) {
    res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
    return;
  }

  res.status(200).json({
    success: true,
    token,
  });
};
