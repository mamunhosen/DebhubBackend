export interface CursorPaginatedResult<T> {
  data: T[];
  count: number;
  nextToken: string | null;
}

export interface OffsetPaginatedResult<T> {
  data: T[];
  count: number;
  total: number;
  skip: number;
  limit: number;
}
