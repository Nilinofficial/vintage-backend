import z from "zod";

export const sendRequestConnectionSchema = z.object({
  receiverId: z.uuid(),
});
