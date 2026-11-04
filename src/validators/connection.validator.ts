import z from "zod";

export const sendRequestConnectionSchema = z.object({
  receiverId: z.uuid(),
});

export const respondToConnectionRequestSchema = z.object({
  status: z.enum(["accepted", "rejected"]),
});
