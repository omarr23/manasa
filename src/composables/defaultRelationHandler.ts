import type { Store } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'
import { setDefaults } from '@/core/helpers/defaults'

export function useDefaultRelationHandler(store: any, query?: FilterQuery) {
  // state encapsulated and managed by the composable
  const baseFilter = query?.filter
  const params = ref(setDefaults(query, DefaultParams())!)
  const dataRef = store.fetchListRef(query)
  const filterRef = ref<Array<any>>()
  const searchFilterRef = ref<string>('')

  const handleOnPageSizeChange = async (size: number) => {
    params.value.size = size
    store.fetchListRef(params.value, dataRef)
  }
  const handlePageChange = (page: number) => {
    params.value.page = page
    store.fetchListRef(params.value, dataRef)
  }
  const handleExportReport = () => {
    store.exportReport()
  }
  const handleSearch = (filter: string) => {
    searchFilterRef.value = filter
    updateParamsFilter()
    store.fetchListRef(params.value, dataRef)
  }
  const handelFetchList = (query?: FilterQuery) => {
    store.fetchListRef(query, dataRef)
  }
  const handleFilter = (filters: Array<string>) => {
    filterRef.value = filters
    updateParamsFilter()
    store.fetchListRef(params.value, dataRef)
  }
  const handleResetFilter = () => {
    filterRef.value = []
    updateParamsFilter()
    store.fetchListRef(params.value, dataRef)
  }
  const updateParamsFilter = () => {
    // Combine baseFilter, searchFilter, and other filters
    const combinedFilters = [
      baseFilter,
      searchFilterRef.value,
      filterRef.value?.join(' and ')
    ].filter((f) => f && f.length > 0)

    params.value.filter = combinedFilters.join(' and ')
  }
  // onMounted(() => window.addEventListener('mousemove', update))
  // onUnmounted(() => window.removeEventListener('mousemove', update))

  // expose managed state as return value
  // console.log(data.value);
  // TODO: add method return type
  return {
    dataRef,
    handelFetchList,
    handleSearch,
    handleOnPageSizeChange,
    handlePageChange,
    handleExportReport,
    handleFilter,
    handleResetFilter
  }
}
