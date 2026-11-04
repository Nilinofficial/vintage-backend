import { Router } from "express";
import {
  getReceivedRequestsController,
  sendConnectionRequestController,
} from "../controllers/connection.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import { sendRequestConnectionSchema } from "../validators/connection.validator.js";

const router = Router();

router.post(
  "/request",
  authenticate,
  validateBody(sendRequestConnectionSchema),
  sendConnectionRequestController,
);
router.get("/requests/received", authenticate, getReceivedRequestsController);
export default router;
