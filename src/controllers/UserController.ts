import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { UserService } from "@/services/UserService";
import { AppError } from "@/utils/AppError";
import { ApiResponse } from "@/utils/ApiResponse";

interface UserIdParams {
  id: string;
}

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const users = await this.userService.getAllUsers();
      ApiResponse.success(res, users);
    } catch (error) {
      next(error);
    }
  };

  getUserById = async (
    req: Request<UserIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      ApiResponse.success(res, user);
    } catch (error) {
      next(error);
    }
  };

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(
          "Validation failed",
          422,
          "VALIDATION_ERROR",
          errors.array(),
        );
      }

      const user = await this.userService.createUser(req.body);
      ApiResponse.success(res, user, "User created successfully", 201);
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (
    req: Request<UserIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(
          "Validation failed",
          422,
          "VALIDATION_ERROR",
          errors.array(),
        );
      }

      const { id } = req.params;
      const user = await this.userService.updateUser(id, req.body);
      ApiResponse.success(res, user, "User updated successfully");
    } catch (error) {
      next(error);
    }
  };

  deleteUser = async (
    req: Request<UserIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      await this.userService.deleteUser(id);
      ApiResponse.success(res, null, "User deleted successfully");
    } catch (error) {
      next(error);
    }
  };

  getUserStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stats = await this.userService.getUserStats();
      ApiResponse.success(res, stats);
    } catch (error) {
      next(error);
    }
  };
}
