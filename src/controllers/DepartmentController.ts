import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { DepartmentService } from "@/services/DepartmentService";
import { AppError } from "@/utils/AppError";
import { ApiResponse } from "@/utils/ApiResponse";

interface BranchIdParams {
  organizationId: string;
}

export class DepartmentController {
  private departmentService: DepartmentService;

  constructor() {
    this.departmentService = new DepartmentService();
  }

  getAllDepartments = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const departments = await this.departmentService.getAllDepartments();
      ApiResponse.success(res, departments);
    } catch (error) {
      next(error);
    }
  };

  getAllDepartmentsByBranch = async (
    req: Request<BranchIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { organizationId } = req.params;
      const departments =
        await this.departmentService.getAllDepartmentsByBranch(organizationId);
      ApiResponse.success(res, departments);
    } catch (error) {
      next(error);
    }
  };

  createDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new AppError(
          "Validation failed",
          422,
          "VALIDATION_ERROR",
          errors.array(),
        );
      }

      const department = await this.departmentService.createDepartment(
        req.body,
      );
      ApiResponse.success(
        res,
        department,
        "Department created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  };
}
