import { DepartmentRepository } from "@/repositories/DepartmentRepository";
import { AppError } from "@/utils/AppError";
import { Department } from "@/entities";

export class DepartmentService {
  private departmentRepository: DepartmentRepository;

  constructor() {
    this.departmentRepository = new DepartmentRepository();
  }

  async getAllDepartments(): Promise<Department[]> {
    return await this.departmentRepository.findAll();
  }

  async getAllDepartmentsByBranch(branchId: string): Promise<Department[]> {
    return await this.departmentRepository.findByBranchId(branchId);
  }

  async createDepartment(departmentData: {
    name: string;
    branchId: string;
  }): Promise<Department> {
    // Check if email already exists
    const existingDepartment =
      await this.departmentRepository.findByBranchIdAndName(
        departmentData.branchId,
        departmentData.name,
      );
    if (existingDepartment) {
      throw new AppError("Department already exists for this branch", 409);
    }

    return await this.departmentRepository.create(departmentData);
  }
}
