import { Router } from "express";

import { AuthController } from "@/controllers/AuthController";
import {
  loginValidation,
  registerValidation,
} from "@/middlewares/authValidation";
import { loginRateLimiter } from "@/middlewares/rateLimiter";

const router = Router();
const authController = new AuthController();

router.post("/login", loginRateLimiter, loginValidation, authController.login);
router.post("/register", registerValidation, authController.register);
router.post("/refresh-token", authController.refreshToken);

export default router;
