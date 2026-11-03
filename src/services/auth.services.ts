import argon2 from "argon2";
import { createUser, findUserByEmail } from "../repository/user.repository.js";
import { RegisterInput } from "../validators/auth.validator.js";
import { generateAccessToken } from "../utils/jwt.js";

export const passwordHashService = async (password: string) => {
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });

  return passwordHash;
};

export const registerUserService = async ({
  name,
  username,
  password,
  email,
  date_of_birth,
}: RegisterInput) => {
  const hashedPassword = await passwordHashService(password);

  const user = await createUser({
    name,
    username,
    email,
    passwordHash: hashedPassword,
    date_of_birth,
  });

  return user;
};

export const loginService = async (email: string, password: string) => {
  const user = await findUserByEmail(email);

  if (!user) {
    return null;
  }

  const isPasswordValid = await argon2.verify(user.password_hash, password);

  if (!isPasswordValid) {
    return null;
  }

  const token = generateAccessToken(user.id);

  return token;
};
