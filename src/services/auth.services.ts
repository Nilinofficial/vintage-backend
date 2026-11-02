import argon2 from "argon2";
import { createUser } from "../repository/user.repository.js";
import { RegisterInput } from "../validators/auth.validator.js";

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
