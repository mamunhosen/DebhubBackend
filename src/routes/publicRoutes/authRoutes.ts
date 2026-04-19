import { Router } from "express";

import { AuthController } from "@/controllers/AuthController";
import {
  loginValidation,
  registerValidation,
} from "@/middlewares/authValidation";

const router = Router();
const authController = new AuthController();

router.post("/login", loginValidation, authController.login);
router.post("/register", registerValidation, authController.register);
router.post("/refresh-token", authController.refreshToken);

export default router;
