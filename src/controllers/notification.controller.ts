import type { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { getNotificationsService } from "../services/notification.services.js";

export const getNotificationsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const notifications = await getNotificationsService(userId);

  res.status(200).json({
    success: true,
    notifications,
  });
};