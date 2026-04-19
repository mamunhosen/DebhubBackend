import { body } from "express-validator";

export const createBranchValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Branch name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Branch name must be between 2 and 100 characters"),

  body("location")
    .trim()
    .notEmpty()
    .withMessage("Location is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Location must be between 2 and 100 characters"),

  body("organizationId")
    .trim()
    .notEmpty()
    .withMessage("Organization ID is required"),
];
