import bcrypt from "bcryptjs";

import { UserRepository } from "@/repositories/UserRepository";
import { User } from "@/entities/User";
import { AppError } from "@/utils/AppError";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async createUser(userData: {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    phone?: string;
  }): Promise<User> {
    // Check if email already exists
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new AppError("Email already in use", 422);
    }

    const newUserPayload = { ...userData };

    if (newUserPayload.password) {
      const salt = await bcrypt.genSalt(10);
      newUserPayload.password = await bcrypt.hash(
        newUserPayload.password,
        salt,
      );
    } else {
      throw new AppError("Password is required", 400);
    }

    return await this.userRepository.create(newUserPayload);
  }

  async updateUser(
    id: string,
    userData: {
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      phone?: string;
      isActive?: boolean;
    },
  ): Promise<User> {
    // Check if user exists
    await this.getUserById(id);

    // If email is being updated, check if it's already in use
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(
        userData.email,
      );
      if (existingUser && existingUser.id !== id) {
        throw new AppError("Email already in use", 400);
      }
    }

    const updatedUserPayload = { ...userData };

    if (updatedUserPayload.password) {
      const salt = await bcrypt.genSalt(10);
      updatedUserPayload.password = await bcrypt.hash(
        updatedUserPayload.password,
        salt,
      );
    }

    const updatedUser = await this.userRepository.update(
      id,
      updatedUserPayload,
    );
    if (!updatedUser) {
      throw new AppError("Failed to update user", 500);
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    // Check if user exists
    await this.getUserById(id);

    const deleted = await this.userRepository.delete(id);
    if (!deleted) {
      throw new AppError("Failed to delete user", 500);
    }
  }

  async getUserStats(): Promise<{ total: number; active: number }> {
    const total = await this.userRepository.count();
    // You can add more stats here
    return { total, active: total };
  }
}
