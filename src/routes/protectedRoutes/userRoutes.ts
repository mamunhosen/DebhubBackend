import { Router } from "express";

import { UserController } from "@/controllers/UserController";
import {
  createUserValidation,
  updateUserValidation,
} from "@/middlewares/userValidation";

const router = Router();
const userController = new UserController();

/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Public
 */
router.get("/", userController.getAllUsers);

/**
 * @route   GET /api/v1/users/stats
 * @desc    Get user statistics
 * @access  Public
 */
router.get("/stats", userController.getUserStats);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get("/:id", userController.getUserById);

/**
 * @route   POST /api/v1/users
 * @desc    Create a new user
 * @access  Public
 */
router.post("/", createUserValidation, userController.createUser);

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Update user by ID
 * @access  Public
 */
router.put("/:id", updateUserValidation, userController.updateUser);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete("/:id", userController.deleteUser);

export default router;
