import { BranchRepository } from "@/repositories/BranchRepository";
import { Branch } from "@/entities/Branch";
import { AppError } from "@/utils/AppError";

export class BranchService {
  private branchRepository: BranchRepository;

  constructor() {
    this.branchRepository = new BranchRepository();
  }

  async getAllBranches(): Promise<Branch[]> {
    return await this.branchRepository.findAll();
  }

  async getAllBranchesByOrganization(
    organizationId: string,
  ): Promise<Branch[]> {
    return await this.branchRepository.findByOrganizationId(organizationId);
  }

  async createBranch(branchData: {
    name: string;
    location: string;
    organizationId: string;
  }): Promise<Branch> {
    // Check if email already exists
    const existingBranch =
      await this.branchRepository.findByOrganizationIdAndName(
        branchData.organizationId,
        branchData.name,
      );
    if (existingBranch) {
      throw new AppError("Branch already exists for this organization", 409);
    }

    return await this.branchRepository.create(branchData);
  }
}
