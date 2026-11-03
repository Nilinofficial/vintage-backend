import type { ErrorRequestHandler } from "express";
import { DatabaseError } from "pg";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof DatabaseError && err.code === "23505") {
    if (err.constraint === "users_username_key") {
      res.status(409).json({
        success: false,
        message: "Username is already taken",
        error: {
          code: "USERNAME_ALREADY_EXISTS",
          field: "username",
        },
      });
      return;
    }

    if (err.constraint === "users_email_lower_unique") {
      res.status(409).json({
        success: false,
        message: "Email is already registered",
        error: {
          code: "EMAIL_ALREADY_EXISTS",
          field: "email",
        },
      });
      return;
    }

    res.status(409).json({
      success: false,
      message: "A record with these details already exists",
      error: {
        code: "DUPLICATE_RECORD",
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: {
      code: "INTERNAL_SERVER_ERROR",
    },
  });
};
