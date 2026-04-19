import { AppDataSource } from "@/config/database";
import { User } from "@/entities/User";

export class UserRepository {
  private repository = AppDataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return await this.repository.find({
      order: { createdAt: "DESC" },
    });
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({ where: { email } });
  }

  async findByEmailWithPassword(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email },
      select: [
        "id",
        "firstName",
        "lastName",
        "email",
        "password",
        "isActive",
        "refreshToken",
        "loginAttempts",
        "lockoutUntil",
      ],
    });
  }

  async findByIdWithRefreshToken(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { id },
      select: ["id", "isActive", "refreshToken"],
    });
  }


  async create(userData: Partial<User>): Promise<User> {
    const user = this.repository.create(userData);
    return await this.repository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    await this.repository.update(id, userData);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }
}
