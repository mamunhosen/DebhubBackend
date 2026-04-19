import { ILike } from "typeorm";

import { AppDataSource } from "@/config/database";
import {
  OffsetPaginatedResult,
  CursorPaginatedResult,
} from "../types/dataset.types";

import { Organization } from "./../entities/Organization";

export class OrganizationRepository {
  private repository = AppDataSource.getRepository(Organization);

  // Cursor-based
  async findAllCursor(
    limit: number,
    nextToken?: string,
    search?: string,
  ): Promise<CursorPaginatedResult<Organization>> {
    const queryBuilder = this.repository
      .createQueryBuilder("organization")
      .orderBy("organization.id", "ASC")
      .take(limit + 1);

    if (nextToken) {
      queryBuilder.where("organization.id > :nextToken", { nextToken });
    }

    if (search) {
      const searchCondition = "LOWER(organization.name) LIKE LOWER(:search)";

      if (nextToken) {
        queryBuilder.andWhere(searchCondition, { search: `%${search}%` });
      } else {
        queryBuilder.where(searchCondition, { search: `%${search}%` });
      }
    }

    const organizations = await queryBuilder.getMany();
    const hasMore = organizations.length > limit;
    const data = hasMore ? organizations.slice(0, limit) : organizations;
    const newNextToken = hasMore ? data[data.length - 1].id : null;

    return {
      data,
      count: data.length,
      nextToken: newNextToken,
    };
  }

  // Offset-based
  async findAllOffset(
    limit: number,
    skip: number,
    search?: string,
  ): Promise<OffsetPaginatedResult<Organization>> {
    const queryOptions: any = {
      order: { id: "ASC" },
      take: limit,
      skip: skip,
    };

    if (search) {
      queryOptions.where = {
        name: ILike(`%${search}%`),
      };
    }

    const [data, total] = await this.repository.findAndCount(queryOptions);

    return {
      data,
      count: data.length,
      total,
      skip,
      limit,
    };
  }

  async findByName(name: string): Promise<Organization | null> {
    return await this.repository.findOne({ where: { name } });
  }

  async create(organizationData: Partial<Organization>): Promise<Organization> {
    const organization = this.repository.create(organizationData);
    return await this.repository.save(organization);
  }
}
