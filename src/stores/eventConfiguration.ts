import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { formData, type eventConfiguration } from '@/providers/eventConfiguration'
import type { PaginationResponse } from '@/@types/PaginationResponse'
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'
import { DefaultResponse } from '@/@types/DefaultValue'
import { setDefaults } from '@/core/helpers/defaults'
import { stripFilterQuery } from '@/core/helpers/filterQuery'
import ApiService from '@/core/services/ApiService'

export const useEventConfigurationStore = defineStore('eventConfiguration', () => {
  // Use this for shared components, I would recommend a map object
  const memoryRef = ref({})

  // Reset To Default Values
  function resetItems() {
    memoryRef.value = {}
  }

  function fetchListRef(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<eventConfiguration>>
  ): Ref<PaginationResponse<eventConfiguration>> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const listData = reference ?? ref<PaginationResponse<eventConfiguration>>(DefaultResponse)
    fetchListAsync(query, listData)
    return listData
  }

  async function fetchListAsync(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<eventConfiguration>>
  ): Promise<PaginationResponse<eventConfiguration>> {
    query = setDefaults(query, DefaultParams())
    stripFilterQuery(query!)

    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query('event/configuration', {
      params: { ...query }
    })
    if (reference) {
      reference.value = data
    }
    return data
  }

  function fetchItemRef(
    id: String,
    query?: FilterQuery,
    reference?: Ref<eventConfiguration>
  ): Ref<eventConfiguration | null> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const itemData = reference ?? ref<eventConfiguration | null>(null)
    fetchItemAsync(id, query, itemData)

    return itemData
  }

  async function fetchItemAsync(
    id: String,
    query?: FilterQuery,
    reference?: Ref<eventConfiguration | null>
  ): Promise<eventConfiguration> {
    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query(`event/configuration/${id}`, {
      params: { ...query }
    })
    if (reference) {
      reference.value = data
    }

    return data
  }

  async function exportReport() {
    try {
      const { data: responseData } = await ApiService.query('event/configuration/export', {
        params: {}
      })
      const link = responseData?.link ?? ''
      if (link) {
        window.open(link, '_blank')?.focus()
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function exportCSV() {
    try {
      const { data: responseData } = await ApiService.query('event/configuration/export/csv', {
        params: {}
      })
      const link = responseData?.url ?? ''
      if (link) {
        window.open(link, '_blank')?.focus()
      }
    } catch (error) {
      console.error(error)
    }
  }
  async function importCSV(payload: Object) {
    const { data } = await ApiService.post('event/configuration/import', payload)
    return data
  }

  async function create(payload: eventConfiguration): Promise<eventConfiguration> {
    const { data } = await ApiService.post('event/configuration', payload)
    return data
  }

  async function update(
    id: string | number,
    payload: typeof formData.value
  ): Promise<eventConfiguration> {
    const { data } = await ApiService.update(`event/configuration/${id}`, payload)

    return data
  }

  function resetItemData() {
    //itemData.value = null;
  }

  async function deleteItem(id: number | string): Promise<eventConfiguration> {
    const { data } = await ApiService.delete(`event/configuration/${id}`)
    return data
  }

  // Return the properties and functions to be used in the component
  return {
    fetchListRef,
    fetchListAsync,
    fetchItemRef,
    fetchItemAsync,
    create,
    update,
    resetItemData,
    deleteItem,
    exportReport,
    exportCSV,
    importCSV,
    resetItems
  }
})
