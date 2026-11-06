import { pool } from "../config/database.js";
import { CreateUser, User, UserWithPassword } from "../types/user.types.js";

export const createUser = async ({
  name,
  username,
  email,
  passwordHash,
  date_of_birth,
}: CreateUser) => {
  const query = `
    INSERT INTO users (
      name,
      username,
      email,
      password_hash,
      date_of_birth
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, name, username, email, created_at
  `;

  const values = [name, username, email, passwordHash, date_of_birth];
  const result = await pool.query(query, values);
  return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<UserWithPassword | null> => {
  const query = `
    SELECT id, name, username, email, password_hash, created_at
    FROM users
    WHERE LOWER(email) = LOWER($1)
    LIMIT 1
  `;

  const result = await pool.query<UserWithPassword>(query, [email]);

  return result.rows[0] ?? null;
};

export const findUserById = async (id: string): Promise<User | null> => {
  const query = `
    SELECT id, name, username, email, created_at
    FROM users
    WHERE id = $1
  `;

  const result = await pool.query<User>(query, [id]);

  return result.rows[0] ?? null;
};

export interface UserBasicInfo {
  id: string;
  name: string;
  username: string;
}

export const findUserBasicInfoById = async (userId: string): Promise<UserBasicInfo | null> => {
  const result = await pool.query<UserBasicInfo>(
    `SELECT id, name, username
     FROM users
     WHERE id = $1`,
    [userId],
  );

  return result.rows[0] ?? null;
};
