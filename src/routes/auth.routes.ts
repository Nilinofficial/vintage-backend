import { Router } from "express";
import { validateBody } from "../middlewares/validate.middleware.js";
import { registerSchema } from "../validators/auth.validator.js";
import { registerController } from "../controllers/register.controller.js";

const router = Router();

router.post("/register", validateBody(registerSchema), registerController);
export default router;
