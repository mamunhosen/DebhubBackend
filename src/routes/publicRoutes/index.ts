import { Router } from "express";

import authRoutes from "./authRoutes";

const publicRouter = Router();

// Health check route (Public)
publicRouter.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

// Auth routes (Public)
publicRouter.use("/auth", authRoutes);

export default publicRouter;
