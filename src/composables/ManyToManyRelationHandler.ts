import type { Store } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'
import { DefaultResponse } from '@/@types/DefaultValue'
import { setDefaults } from '@/core/helpers/defaults'

export function useManyToManyHandler(store: any, query?: FilterQuery, modalQuery?: FilterQuery) {
  // state encapsulated and managed by the composable
  const baseFilter = query?.filter
  const params = ref(setDefaults(query, DefaultParams())!)
  const filterRef = ref<Array<any>>([])
  const searchFilterRef = ref<string>('')

  const modalParams = ref(setDefaults(modalQuery, DefaultParams())!)
  const baseFilterModal = modalQuery?.filter
  const filterRefModal = ref<Array<any>>([])
  const searchFilterRefModal = ref<string>('')

  const dataRef = store.fetchListRef(params.value)
  const dataRefModal = ref(DefaultResponse)

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
  const handleSearchModal = (filter: string) => {
    searchFilterRefModal.value = filter
    updateParamsFilterModal()
    store.fetchListRef(modalParams.value, dataRefModal)
  }
  const handelFetchList = (query?: FilterQuery) => {
    store.fetchListRef(query, dataRef)
  }
  const handelOpenModal = (relationName: string, id: string, relationKeyFilter: string) => {
    modalParams.value.filter = `has none ${relationName}.${relationKeyFilter} eq ${id}`
    searchFilterRefModal.value = ''
    updateParamsFilterModal()
    store.fetchListRef(modalParams.value, dataRefModal)
  }

  const detachItem = async (model: string, id: string, relationKey: string, payload: any) => {
    await store.detachItem(model, id, relationKey, payload)
    store.fetchListRef(query, dataRef)
  }
  const assignItem = async (model: string, id: string, relationKey: string, payload: any) => {
    await store.assignItem(model, id, relationKey, payload)
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

  const handleFilterModal = (filters: Array<string>) => {
    filterRefModal.value = filters
    updateParamsFilterModal()
    store.fetchListRef(modalParams.value, dataRefModal)
  }
  const handleResetFilterModal = () => {
    filterRefModal.value = []
    updateParamsFilterModal()
    store.fetchListRef(modalParams.value, dataRefModal)
  }
  const updateParamsFilterModal = () => {
    // Combine baseFilter, searchFilter, and other filters
    const combinedFilters = [
      baseFilterModal,
      searchFilterRefModal.value,
      filterRefModal.value?.join(' and ')
    ].filter((f) => f && f.length > 0)

    modalParams.value.filter = combinedFilters.join(' and ')
  }
  // TODO: add method return type
  return {
    dataRef,
    dataRefModal,
    handelFetchList,
    handleSearch,
    handleSearchModal,
    handleOnPageSizeChange,
    handlePageChange,
    handleExportReport,
    detachItem,
    assignItem,
    handelOpenModal,
    handleFilter,
    handleFilterModal,
    handleResetFilter,
    handleResetFilterModal
  }
}
