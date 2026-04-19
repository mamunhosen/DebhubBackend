import { body } from "express-validator";

export const createOrganizationValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Organization name is required")
    .isLength({ min: 4, max: 100 })
    .withMessage("Organization name must be between 4 and 100 characters"),
];
