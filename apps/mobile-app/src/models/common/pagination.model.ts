export interface Pagination<T> {
  currentPage: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  nextPage?: number;
  data: T[];
}
