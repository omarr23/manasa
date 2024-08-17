export interface PaginationResponse<T> {
  content: T[]
  totalPages: number
  totalElements: number
  page: number
  size: number
}
