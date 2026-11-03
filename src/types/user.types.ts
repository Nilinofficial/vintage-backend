export type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  created_at: Date;
};

export type CreateUser = {
  name: string;
  username: string;
  email: string;
  passwordHash: string;
  date_of_birth: string;
};

export type UserWithPassword = User & {
  password_hash: string;
};
