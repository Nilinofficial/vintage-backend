import type { Request, Response } from "express";
import { RegisterInput } from "../validators/auth.validator.js";
import { passwordHashService, registerUserService } from "../services/auth.services.js";
import { createUser } from "../repository/user.repository.js";

export const registerController = async (req: Request, res: Response) => {
  const data = req.body as RegisterInput;

 const user = await registerUserService(data)
  res.status(200).json({
    success: true,
    message: "User Created Successfully",
    user,
  });
};
