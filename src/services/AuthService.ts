import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserRepository } from "@/repositories/UserRepository";
import { AppError } from "@/utils/AppError";

export interface TokenPayload {
  id: string;
}

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string; user: any }> {
    const user = await this.userRepository.findByEmailWithPassword(email);

    if (!user) {
      throw new AppError("Invalid credentials", 401);
    }

    // Check if account is locked
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const remainingMinutes = Math.ceil(
        (user.lockoutUntil.getTime() - Date.now()) / 1000 / 60,
      );
      throw new AppError(
        `Account is locked due to too many failed attempts. Please try again in ${remainingMinutes} minutes.`,
        403,
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const maxAttempts = 3;
      const loginAttempts = (user.loginAttempts || 0) + 1;
      const remainingAttempts = Math.max(0, maxAttempts - loginAttempts);
      let lockoutUntil: Date | null = null;

      if (loginAttempts >= maxAttempts) {
        lockoutUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
      }

      await this.userRepository.update(user.id, {
        loginAttempts,
        lockoutUntil: lockoutUntil as any,
      });

      if (loginAttempts >= maxAttempts) {
        throw new AppError(
          "Account locked due to 3 failed attempts. Please try again in 15 minutes.",
          403,
          "ACCOUNT_LOCKED",
        );
      }

      throw new AppError(
        `Invalid credentials. ${remainingAttempts} attempts remaining.`,
        401,
        "INVALID_CREDENTIALS",
        { remainingAttempts },
      );
    }

    if (!user.isActive) {
      throw new AppError("User account is disabled", 403);
    }

    const tokens = this.generateTokens(user.id);

    // Store hashed refresh token and reset login attempts
    const salt = await bcrypt.genSalt(10);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);
    await this.userRepository.update(user.id, {
      refreshToken: hashedRefreshToken,
      loginAttempts: 0,
      lockoutUntil: null as any,
    });

    // Remove sensitive fields
    const {
      password: _,
      refreshToken: __,
      loginAttempts: ___,
      lockoutUntil: ____,
      ...userWithoutSecrets
    } = user;

    return {
      ...tokens,
      user: userWithoutSecrets,
    };
  }

  async refresh(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const secret = process.env.JWT_REFRESH_SECRET || "default_refresh_secret";
      const decoded = jwt.verify(refreshToken, secret) as TokenPayload;

      const user = await this.userRepository.findByIdWithRefreshToken(
        decoded.id,
      );

      if (!user || !user.refreshToken) {
        throw new AppError("Invalid refresh token", 401);
      }

      if (!user.isActive) {
        throw new AppError("User account is disabled", 403);
      }

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);

      if (!isMatch) {
        // Token reuse or breach? We could clear the token here for safety.
        await this.userRepository.update(user.id, { refreshToken: undefined });
        throw new AppError("Invalid refresh token", 401);
      }

      const tokens = this.generateTokens(user.id);

      // Token Rotation: hash and save new refresh token
      const salt = await bcrypt.genSalt(10);
      const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, salt);
      await this.userRepository.update(user.id, {
        refreshToken: hashedRefreshToken,
      });

      return tokens;
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        throw new AppError("Invalid refresh token", 401);
      }
      throw error;
    }
  }

  private generateTokens(
    userId: string,
  ): { accessToken: string; refreshToken: string } {
    const accessSecret = process.env.JWT_SECRET || "default_secret";
    const refreshSecret =
      process.env.JWT_REFRESH_SECRET || "default_refresh_secret";

    const accessToken = jwt.sign({ id: userId }, accessSecret, {
      expiresIn: (process.env.JWT_EXPIRES_IN || "15m") as any,
    });

    const refreshToken = jwt.sign({ id: userId }, refreshSecret, {
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || "7d") as any,
    });

    return { accessToken, refreshToken };
  }
}
