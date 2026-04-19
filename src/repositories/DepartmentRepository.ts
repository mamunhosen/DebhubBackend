import { AppDataSource } from "@/config/database";
import { Department } from "@/entities/Department";

export class DepartmentRepository {
  private repository = AppDataSource.getRepository(Department);

  async findAll(): Promise<Department[]> {
    return await this.repository.find({
      order: { createdAt: "DESC" },
    });
  }

  async findByName(name: string): Promise<Department | null> {
    return await this.repository.findOne({ where: { name } });
  }

  async findByBranchIdAndName(
    branchId: string,
    name: string,
  ): Promise<Department | null> {
    return await this.repository.findOne({ where: { branchId, name } });
  }

  async findByBranchId(branchId: string): Promise<Department[]> {
    return await this.repository.find({ where: { branchId } });
  }

  async create(departmentData: Partial<Department>): Promise<Department> {
    const department = this.repository.create(departmentData);
    return await this.repository.save(department);
  }
}
