export interface DatabaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QueryResult<T> {
  data: T[];
  total: number;
}

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'ASC' | 'DESC';
}
