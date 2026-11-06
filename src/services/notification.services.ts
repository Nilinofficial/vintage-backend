import { getUserBasicInfoService } from "../controllers/user.controller.js";
import { createNotification, findNotificationsByReceiverId } from "../repository/notification.repository.js";

export const createFriendRequestNotificationService = async (
  senderId: string,
  receiverId: string,
) => {
  const sender = await getUserBasicInfoService(senderId);

  const message = `${sender.name} (@${sender.username}) sent you a friend request`;

  const notification = await createNotification({
    actorId: senderId,
    receiverId,
    type: "friend_request",
    message,
  });

  return notification;
};

export const getNotificationsService = async (userId: string) => {
  return await findNotificationsByReceiverId(userId);
};