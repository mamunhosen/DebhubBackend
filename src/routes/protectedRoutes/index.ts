import { Router } from "express";
import { authMiddleware } from "@/middlewares/authMiddleware";

import userRoutes from "./userRoutes";
import organizationRoutes from "./organizationRoutes";
import branchRoutes from "./branchRoutes";
import departmentRoutes from "./departmentRoutes";

const protectedRouter = Router();

// --- Grouping Logic using the Middleware Application Pattern ---

// 1. Apply middleware to the entire router instance first
protectedRouter.use(authMiddleware);

// 2. Attach all sub-routers that require protection
protectedRouter.use("/users", userRoutes);
protectedRouter.use("/organizations", organizationRoutes);
protectedRouter.use("/branches", branchRoutes);
protectedRouter.use("/departments", departmentRoutes);

export default protectedRouter;
