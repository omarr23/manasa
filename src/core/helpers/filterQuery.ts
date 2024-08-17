import type { FilterQuery } from '@/@types/FilterQuery'

export const stripFilterQuery = (query: FilterQuery) => {
  query.filter = query.filter == '' ? undefined : query.filter
}
