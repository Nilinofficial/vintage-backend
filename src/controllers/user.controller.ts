import type { Request, Response } from "express";
import { getMyProfileService } from "../services/user.services.js";
import { findUserBasicInfoById } from "../repository/user.repository.js";
import { AppError } from "../utils/AppError.js";

export const getMyProfileController = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const user = await getMyProfileService(userId);

  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    user,
  });
};

export const getUserBasicInfoService = async (userId: string) => {
  const user = await findUserBasicInfoById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return user;
};
