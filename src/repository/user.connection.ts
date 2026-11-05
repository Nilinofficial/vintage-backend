import { pool } from "../config/database.js";

export const findConnectionBetweenUsers = async (userId1: string, userId2: string) => {
  const query = `
    SELECT id, sender_id, receiver_id, status
    FROM connection_requests
    WHERE
      (sender_id = $1 AND receiver_id = $2)
      OR
      (sender_id = $2 AND receiver_id = $1)
    LIMIT 1
  `;

  const result = await pool.query(query, [userId1, userId2]);

  return result.rows[0] ?? null;
};

export const createConnectionRequest = async (senderId: string, receiverId: string) => {
  const query = `
    INSERT INTO connection_requests (sender_id, receiver_id)
    VALUES ($1, $2)
    RETURNING id, sender_id, receiver_id, status, created_at
  `;

  const result = await pool.query(query, [senderId, receiverId]);
  return result.rows[0];
};

export const getReceivedConnectionRequests = async (userId: string) => {
  const query = `
    SELECT
      cr.id,
      cr.sender_id,
      cr.status,
      cr.created_at,
      u.name,
      u.username
    FROM connection_requests cr
    JOIN users u ON u.id = cr.sender_id
    WHERE cr.receiver_id = $1
      AND cr.status = 'pending'
    ORDER BY cr.created_at DESC
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};

export const updateConnectionRequestStatus = async (
  requestId: string,
  receiverId: string,
  status: "accepted" | "rejected",
) => {
  const query = `
    UPDATE connection_requests
    SET status = $1,
        updated_at = NOW()
    WHERE id = $2
      AND receiver_id = $3
      AND status = 'pending'
    RETURNING id, sender_id, receiver_id, status, updated_at
  `;

  const result = await pool.query(query, [status, requestId, receiverId]);

  return result.rows[0] ?? null;
};

export const getFriends = async (userId: string) => {
  const query = `
    SELECT
      u.id,
      u.name,
      u.username
    FROM connection_requests cr
    JOIN users u
      ON u.id = CASE
        WHEN cr.sender_id = $1 THEN cr.receiver_id
        ELSE cr.sender_id
      END
    WHERE (cr.sender_id = $1 OR cr.receiver_id = $1)
      AND cr.status = 'accepted'
  `;

  const result = await pool.query(query, [userId]);

  return result.rows;
};