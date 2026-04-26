import { Router } from "express";
import { authMiddleware } from "@/middlewares/authMiddleware";

import userRoutes from "./userRoutes";
import organizationRoutes from "./organizationRoutes";
import branchRoutes from "./branchRoutes";
import departmentRoutes from "./departmentRoutes";

const protectedRouter = Router();

// --- Grouping Logic using the Middleware Application Pattern ---

// Apply authMiddleware to each sub-router specifically
protectedRouter.use("/users", authMiddleware, userRoutes);
protectedRouter.use("/organizations", authMiddleware, organizationRoutes);
protectedRouter.use("/branches", authMiddleware, branchRoutes);
protectedRouter.use("/departments", authMiddleware, departmentRoutes);

export default protectedRouter;
