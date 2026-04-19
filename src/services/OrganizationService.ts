import {
  CursorPaginatedResult,
  OffsetPaginatedResult,
} from "@/types/dataset.types";
import { OrganizationRepository } from "@/repositories/OrganizationRepository";
import { Organization } from "@/entities/Organization";
import { AppError } from "@/utils/AppError";

export class OrganizationService {
  private organizationRepository: OrganizationRepository;

  constructor() {
    this.organizationRepository = new OrganizationRepository();
  }

  // Cursor-based pagination
  async getAllOrganizationsCursor(
    limit: number,
    nextToken?: string,
    search?: string,
  ): Promise<CursorPaginatedResult<Organization>> {
    return await this.organizationRepository.findAllCursor(
      limit,
      nextToken,
      search,
    );
  }

  // Offset-based pagination
  async getAllOrganizationsOffset(
    limit: number,
    skip: number,
    search?: string,
  ): Promise<OffsetPaginatedResult<Organization>> {
    return await this.organizationRepository.findAllOffset(limit, skip, search);
  }

  async createOrganization(name: string): Promise<Organization> {
    // Check if organization already exists
    const existingOrganization =
      await this.organizationRepository.findByName(name);
    if (existingOrganization) {
      throw new AppError("Organization already exists", 409);
    }

    return await this.organizationRepository.create({ name });
  }
}
