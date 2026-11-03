import { findUserById } from "../repository/user.repository.js";

export const getMyProfileService = async (userId: string) => {
  return await findUserById(userId);
};
