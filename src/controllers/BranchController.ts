import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { BranchService } from "@/services/BranchService";
import { AppError } from "@/utils/AppError";
import { ApiResponse } from "@/utils/ApiResponse";

interface OrganizationIdParams {
  organizationId: string;
}

export class BranchController {
  private branchService: BranchService;

  constructor() {
    this.branchService = new BranchService();
  }

  getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const branches = await this.branchService.getAllBranches();
      ApiResponse.success(res, branches);
    } catch (error) {
      next(error);
    }
  };

  getAllBranchesByOrganization = async (
    req: Request<OrganizationIdParams>,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { organizationId } = req.params;
      const branches =
        await this.branchService.getAllBranchesByOrganization(organizationId);
      ApiResponse.success(res, branches);
    } catch (error) {
      next(error);
    }
  };

  createBranch = async (
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

      const branch = await this.branchService.createBranch(req.body);
      ApiResponse.success(res, branch, "Branch created successfully", 201);
    } catch (error) {
      next(error);
    }
  };
}
