import { Response } from "express";

export interface PaginationMeta {
  count: number;
  limit: number;
  total?: number;
  skip?: number;
  nextToken?: string | null;
}

export class ApiResponse {
  /**
   * Send a standard success response
   */
  static success<T>(
    res: Response,
    data: T,
    message?: string,
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({
      success: true,
      ...(message && { message }),
      data,
    });
  }

  /**
   * Send a paginated success response
   */
  static paginated<T>(
    res: Response,
    data: T[],
    meta: PaginationMeta,
    statusCode: number = 200,
  ) {
    return res.status(statusCode).json({
      success: true,
      data,
      meta: {
        count: meta.count,
        limit: meta.limit,
        ...(meta.total !== undefined && { total: meta.total }),
        ...(meta.skip !== undefined && { skip: meta.skip }),
        ...(meta.nextToken !== undefined && { nextToken: meta.nextToken }),
      },
    });
  }
}
