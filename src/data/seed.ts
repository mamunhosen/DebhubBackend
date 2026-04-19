import { AppDataSource } from "../config/database";
import { Organization } from "../entities/Organization";
import { Branch } from "../entities/Branch";
import { Department } from "../entities/Department";

export async function seed() {
  await AppDataSource.initialize();

  const orgRepo = AppDataSource.getRepository(Organization);
  const branchRepo = AppDataSource.getRepository(Branch);
  const deptRepo = AppDataSource.getRepository(Department);

  const org = await orgRepo.save(
    orgRepo.create({ name: "QuantumQuasar Tech" }),
  );

  const dhaka = await branchRepo.save(
    branchRepo.create({
      name: "Dhaka Branch",
      location: "Dhaka",
      organizationId: org.id,
    }),
  );

  await deptRepo.save([
    deptRepo.create({
      name: "Engineering",
      branchId: dhaka.id,
    }),
    deptRepo.create({
      name: "HR",
      branchId: dhaka.id,
    }),
  ]);

  console.log("Seed completed");
  process.exit(0);
}

seed();
