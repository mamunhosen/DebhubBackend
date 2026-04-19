import { AppDataSource } from "../config/database";

import { Branch } from "@/entities/Branch";

export class BranchRepository {
  private repository = AppDataSource.getRepository(Branch);

  async findAll(): Promise<Branch[]> {
    return await this.repository.find({
      order: { createdAt: "DESC" },
    });
  }

  async findByName(name: string): Promise<Branch | null> {
    return await this.repository.findOne({ where: { name } });
  }

  async findByOrganizationIdAndName(
    organizationId: string,
    name: string,
  ): Promise<Branch | null> {
    return await this.repository.findOne({ where: { organizationId, name } });
  }

  async findByOrganizationId(organizationId: string): Promise<Branch[]> {
    return await this.repository.find({ where: { organizationId } });
  }

  async create(branchData: Partial<Branch>): Promise<Branch> {
    const branch = this.repository.create(branchData);
    return await this.repository.save(branch);
  }
}
