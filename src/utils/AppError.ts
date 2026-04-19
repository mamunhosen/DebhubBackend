export class AppError extends Error {
  public statusCode: number;
  public errorCode: string;
  public details?: unknown;
  public isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    errorCode?: string,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode || this.getDefaultErrorCode(statusCode);
    this.details = details;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }

  private getDefaultErrorCode(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return "BAD_REQUEST";
      case 401:
        return "UNAUTHORIZED";
      case 403:
        return "FORBIDDEN";
      case 404:
        return "NOT_FOUND";
      case 409:
        return "CONFLICT";
      case 422:
        return "VALIDATION_ERROR";
      default:
        return "INTERNAL_SERVER_ERROR";
    }
  }
}
