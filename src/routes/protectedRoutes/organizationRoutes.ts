import { Router } from "express";

import { OrganizationController } from "@/controllers/OrganizationController";
import { createOrganizationValidation } from "@/middlewares/organizationValidation";

const router = Router();
const organizationController = new OrganizationController();

/**
 * @route   GET /api/v1/organizations
 * @desc    Get all organizations
 * @access  Public
 */
router.get("/", organizationController.getAllOrganizations);

/**
 * @route   POST /api/v1/organizations
 * @desc    Create a new organization
 * @access  Public
 */
router.post(
  "/",
  createOrganizationValidation,
  organizationController.createOrganization,
);

export default router;
