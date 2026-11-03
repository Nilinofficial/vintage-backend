import { email, z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3).max(30),
  username: z
    .string()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, "Username must contain only lowercase letters, numbers")
    .refine(
      (username) => (username.match(/[a-z]/g) ?? []).length >= 3,
      "Username must contain at least 3 letters",
    ),
  email: z.email().trim().toLowerCase(),

  password: z.string().min(8).max(128),

  date_of_birth: z.iso
    .date()
    .refine(
      (date) => date < new Date().toISOString().slice(0, 10),
      "Date of birth must be in the past",
    ),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase(),
  password: z.string().min(1),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
