import { Router } from "express";
import {
  getFriendsController,
  getReceivedRequestsController,
  respondToConnectionRequestController,
  sendConnectionRequestController,
} from "../controllers/connection.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
  respondToConnectionRequestSchema,
  sendRequestConnectionSchema,
} from "../validators/connection.validator.js";

const router = Router();

router.post(
  "/requests",
  authenticate,
  validateBody(sendRequestConnectionSchema),
  sendConnectionRequestController,
);
router.get("/requests", authenticate, getReceivedRequestsController);

router.patch(
  "/requests/:id",
  authenticate,
  validateBody(respondToConnectionRequestSchema),
  respondToConnectionRequestController,
);

router.get("/", authenticate, getFriendsController);

export default router;
