import { Request, Response, NextFunction } from "express";

import { AppError } from "@/utils/AppError";

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  let statusCode = 500;
  let errorCode = "INTERNAL_SERVER_ERROR";
  let message = "Internal server error";
  let details: unknown = undefined;

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    errorCode = err.errorCode;
    message = err.message;
    details = err.details;
  } else if (err.name === "QueryFailedError") {
    statusCode = 400;
    errorCode = "DATABASE_ERROR";
    message = "Database query failed";
  } else if (err.name === "UnauthorizedError") {
    // jwt-express error or similar
    statusCode = 401;
    errorCode = "UNAUTHORIZED";
    message = "Unauthorized access";
  }

  const errorResponse: any = {
    success: false,
    error: {
      code: errorCode,
      message: message,
    },
  };

  if (details) {
    errorResponse.error.details = details;
  }

  if (process.env.NODE_ENV === "development") {
    errorResponse.error.stack = err.stack;
    errorResponse.error.internal = err.message;
  }

  if (statusCode === 500 && process.env.NODE_ENV !== "development") {
    console.error("Unhandled error:", err);
  }

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.status(404).json({
    success: false,
    error: {
      code: "NOT_FOUND",
      message: `Route ${req.originalUrl} not found`,
    },
  });
};
