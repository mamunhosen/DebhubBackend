import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { OrganizationService } from "@/services/OrganizationService";
import { AppError } from "@/utils/AppError";
import { ApiResponse } from "@/utils/ApiResponse";

export class OrganizationController {
  private organizationService: OrganizationService;

  constructor() {
    this.organizationService = new OrganizationService();
  }

  getAllOrganizations = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const nextToken = req.query.nextToken as string | undefined;
      const skip = req.query.skip
        ? parseInt(req.query.skip as string)
        : undefined;
      const search = req.query.search as string | undefined;

      if (nextToken !== undefined || skip === undefined) {
        // Cursor-based pagination
        const result = await this.organizationService.getAllOrganizationsCursor(
          limit,
          nextToken,
          search,
        );
        ApiResponse.paginated(res, result.data, {
          count: result.count,
          limit,
          nextToken: result.nextToken,
        });
      } else {
        // Offset-based pagination
        const result = await this.organizationService.getAllOrganizationsOffset(
          limit,
          skip,
          search,
        );
        ApiResponse.paginated(res, result.data, {
          count: result.count,
          limit,
          total: result.total,
          skip: result.skip,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  createOrganization = async (
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

      const organization = await this.organizationService.createOrganization(
        req.body.name,
      );
      ApiResponse.success(
        res,
        organization,
        "Organization created successfully",
        201,
      );
    } catch (error) {
      next(error);
    }
  };
}
