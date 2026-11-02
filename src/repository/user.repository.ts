import { pool } from "../config/database.js";

type CreateUserInput = {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  date_of_birth: string;
};

export const createUser = async ({
  name,
  username,
  email,
  passwordHash,
  date_of_birth,
}: CreateUserInput) => {
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
