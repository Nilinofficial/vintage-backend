import type { ErrorRequestHandler } from "express";
import { DatabaseError } from "pg";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof DatabaseError && err.code === "23505") {
    res.status(409).json({
      success: false,
      message: "Username or email already exists",
      error: {
        code: "USER_ALREADY_EXISTS",
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