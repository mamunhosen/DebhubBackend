import { Router } from "express";

import { BranchController } from "@/controllers/BranchController";
import { createBranchValidation } from "@/middlewares/branchValidation";

const router = Router();
const branchController = new BranchController();

/**
 * @route   GET /api/v1/branches
 * @desc    Get all branches
 * @access  Public
 */
router.get("/", branchController.getAllBranches);

/**
 * @route   GET /api/v1/branches/:organizationId
 * @desc    Get all branches for an organization
 * @access  Public
 */
router.get("/:organizationId", branchController.getAllBranchesByOrganization);

/**
 * @route   POST /api/v1/branches
 * @desc    Create a new branch
 * @access  Public
 */
router.post("/", createBranchValidation, branchController.createBranch);

export default router;
