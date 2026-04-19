import rateLimit from "express-rate-limit";

import { AppError } from "@/utils/AppError";

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` (15 minutes)
  message: {
    status: "error",
    message:
      "Too many login attempts from this IP, please try again after 15 minutes",
    code: "TOO_MANY_REQUESTS",
  },
  handler: (req, res, next, options) => {
    throw new AppError(options.message.message, 429, options.message.code);
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
