import {
  createConnectionRequest,
  findConnectionBetweenUsers,
  getReceivedConnectionRequests,
} from "../repository/user.connection.js";
import { AppError } from "../utils/AppError.js";

export const sendConnectionRequestService = async (senderId: string, receiverId: string) => {
  if (senderId === receiverId)
    throw new AppError(409, "You cannot send a connection request to yourself");

  const existingConnection = await findConnectionBetweenUsers(senderId, receiverId);

  if (existingConnection)
    throw new Error("A connection request already exists between these two years");

  const connection = await createConnectionRequest(senderId, receiverId);

  return connection;
};

export const getReceivedRequestsService = async (userId: string) => {
  return getReceivedConnectionRequests(userId);
};
