import {Router} from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getMyProfileController } from '../controllers/user.controller.js';

const router  = Router();

router.get("/me",authenticate,getMyProfileController)

export default router