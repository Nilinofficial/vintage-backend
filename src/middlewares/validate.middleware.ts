import { RequestHandler } from "express";
import z from "zod";

export const validateBody = (schema: z.ZodType): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation Failed",
        errors: z.flattenError(result.error).fieldErrors,
      });
    }
    req.body = result.data;
    next();
  };
};
