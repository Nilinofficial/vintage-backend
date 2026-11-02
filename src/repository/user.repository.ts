import { pool } from "../config/database.js";
import { CreateUser, User } from "../types/user.types.js";


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
