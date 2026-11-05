import type { Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import {
    getFriendsService,
  getReceivedRequestsService,
  respondToConnectionRequestService,
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

export const respondToConnectionRequestController = async (req: Request, res: Response) => {
  const requestId = req.params.id;
  const { status } = req.body;
  const receiverId = req.userId;

  if (!receiverId) {
    throw new AppError(401, "Unauthorized");
  }

  if (typeof requestId !== "string") {
    throw new AppError(400, "Invalid request ID");
  }

  if (!requestId) {
    throw new AppError(400, "Request ID is required");
  }

  const updatedRequest = await respondToConnectionRequestService(requestId, receiverId, status);

  res.status(200).json({
    success: true,
    message: `Connection request ${status}`,
    connection: updatedRequest,
  });
};

export const getFriendsController = async (
  req: Request,
  res: Response
) => {
  const userId = req.userId;

  if (!userId) {
    throw new AppError(401, "Unauthorized");
  }

  const friends = await getFriendsService(userId);

  res.status(200).json({
    success: true,
    friends,
  });
};