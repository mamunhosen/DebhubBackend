import { Request, Response, NextFunction } from "express";
import { AuthService } from "@/services/AuthService";
import { UserService } from "@/services/UserService";
import { validationResult } from "express-validator";
import { AppError } from "@/utils/AppError";
import { ApiResponse } from "@/utils/ApiResponse";

export class AuthController {
  private authService: AuthService;
  private userService: UserService;

  constructor() {
    this.authService = new AuthService();
    this.userService = new UserService();
  }

  login = async (
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

      const { email, password } = req.body;
      const result = await this.authService.login(email, password);

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };

  register = async (
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

      await this.userService.createUser(req.body);

      // Optionally login after registration
      const loginResult = await this.authService.login(
        req.body.email,
        req.body.password,
      );

      ApiResponse.success(
        res,
        loginResult,
        "User registered successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new AppError("Refresh token is required", 400);
      }

      const result = await this.authService.refresh(refreshToken);

      ApiResponse.success(res, result);
    } catch (error) {
      next(error);
    }
  };
}
