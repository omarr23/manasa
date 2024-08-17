import type { PaginationResponse } from '@/@types/PaginationResponse'

export const DefaultResponse: PaginationResponse<any> = {
  content: [],
  totalPages: 0,
  totalElements: 0,
  page: 1,
  size: 10
}
