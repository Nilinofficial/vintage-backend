import type { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import {
  getReceivedRequestsService,
  sendConnectionRequestService,
} from "../services/connection.services.js";

export const sendConnectionRequestController = async (req: Request, res: Response) => {
  const senderId = req.userId;
  const { receiverId } = req.body;

  if (!senderId) throw new AppError(401, "Unauthorized");

  const connection = await sendConnectionRequestService(senderId, receiverId);

  res.status(201).json({
    message: "Connection request sent successfully",
    connection,
  });
};

export const getReceivedRequestsController = async (req: Request, res: Response) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const requests = await getReceivedRequestsService(userId);

  res.status(200).json({
    success: true,
    requests,
  });
};
