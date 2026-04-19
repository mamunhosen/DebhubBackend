import { Router } from "express";

import { DepartmentController } from "@/controllers/DepartmentController";
import { createDepartmentValidation } from "@/middlewares/departmentValidation";

const router = Router();
const departmentController = new DepartmentController();

/**
 * @route   GET /api/v1/branches
 * @desc    Get all branches
 * @access  Public
 */
router.get("/", departmentController.getAllDepartments);

/**
 * @route   GET /api/v1/branches/:organizationId
 * @desc    Get all branches for an organization
 * @access  Public
 */
router.get("/:organizationId", departmentController.getAllDepartmentsByBranch);

/**
 * @route   POST /api/v1/branches
 * @desc    Create a new branch
 * @access  Public
 */
router.post(
  "/",
  createDepartmentValidation,
  departmentController.createDepartment,
);

export default router;
