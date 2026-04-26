import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes";
import { errorHandler, notFoundHandler } from "@/middlewares/errorHandler";

export const createApp = (): Application => {
  const app = express();

  // Security middlewares
  app.use(helmet());
  app.use(cors({
    origin: ["http://localhost:5173"]
  }));

  // Body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Logging middleware
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  // API routes
  const apiPrefix = process.env.API_PREFIX || "/api/v1";
  app.use(apiPrefix, routes);

  // Root route
  app.get("/", (req, res) => {
    res.json({
      success: true,
      message: "Welcome to Node.js Express TypeScript API",
      version: "1.0.0",
      endpoints: {
        health: `${apiPrefix}/health`,
        users: `${apiPrefix}/users`,
      },
    });
  });

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
