import { pool } from "../config/database.js"; // Adjust import path

export type CreateNotificationInput = {
  receiverId: string;
  actorId: string;
  type: "friend_request" | "friend_accepted";
  message: string;
};

export const createNotification = async ({
  receiverId,
  actorId,
  type,
  message,
}: CreateNotificationInput) => {
  const result = await pool.query(
    `INSERT INTO notifications
      (receiver_id, actor_id, type, message)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [receiverId, actorId, type, message],
  );

  return result.rows[0];
};


export const findNotificationsByReceiverId = async (
  receiverId: string
) => {
  const result = await pool.query(
    `SELECT
       id,
       actor_id,
       receiver_id,
       type,
       message,
       created_at
     FROM notifications
     WHERE receiver_id = $1
     ORDER BY created_at DESC, id DESC`,
    [receiverId]
  );

  return result.rows;
};