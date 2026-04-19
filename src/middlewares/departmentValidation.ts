import { body } from "express-validator";

export const createDepartmentValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Department name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Department name must be between 2 and 100 characters"),

  body("branchId").trim().notEmpty().withMessage("Branch ID is required"),
];
