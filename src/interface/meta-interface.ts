export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ApiResponse<T> {
  meta: IMeta;
  data: T[];
}

export interface GetPaginationParams {
  page?: number;
  limit?: number;
  search_term?: string;
}
