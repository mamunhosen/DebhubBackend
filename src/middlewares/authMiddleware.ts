import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "@/utils/AppError";
import { UserRepository } from "@/repositories/UserRepository";

interface TokenPayload {
  id: string;
}

// Extend Express Request type locally or globally
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Not authorized to access this route", 401);
    }

    const secret = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secret) as TokenPayload;

    const userRepository = new UserRepository();
    const user = await userRepository.findById(decoded.id);

    if (!user) {
      throw new AppError("No user found with this id", 401);
    }

    if (!user.isActive) {
      throw new AppError("User account is disabled", 403);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError("Not authorized to access this route", 401));
    } else {
      next(error);
    }
  }
};
