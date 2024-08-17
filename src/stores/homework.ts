import { defineStore } from "pinia";
import { ref, type Ref } from 'vue'
import { formData, type homework, withArray } from '@/providers/homework'
import type { PaginationResponse } from '@/@types/PaginationResponse'
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'
import { DefaultResponse } from '@/@types/DefaultValue'
import { setDefaults } from '@/core/helpers/defaults'
import { stripFilterQuery } from '@/core/helpers/filterQuery'
import ApiService from "@/core/services/ApiService";

export const useHomeworkStore = defineStore("homework", () => {
 
// Use this for shared components, I would recommend a map object
  const memoryRef = ref({})

  // Reset To Default Values 
  function resetItems() {
    memoryRef.value = {}
}
  
  function fetchListRef(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<homework>>
  ): Ref<PaginationResponse<homework>> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const listData = reference ?? ref<PaginationResponse<homework>>(DefaultResponse)
    fetchListAsync(query, listData)
    return listData
  }


  async function fetchListAsync(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<homework>>
  ): Promise<PaginationResponse<homework>> {
    query = setDefaults(query, DefaultParams())
    stripFilterQuery(query!)

    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query('homework', {
      params: {...query, with:  withArray.join()},
    })
    if (reference) {
      reference.value = data
    }
    return data
}
  
  function fetchItemRef(
    id: String,
    query?: FilterQuery,
    reference?: Ref<homework>
  ): Ref<homework | null> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const itemData = reference ?? ref<homework | null>(null)
    fetchItemAsync(id, query, itemData)

    return itemData
}
  
  async function fetchItemAsync(
    id: String,
    query?: FilterQuery,
    reference?: Ref<homework | null>
  ): Promise<homework> {
    
    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query(`homework/${id}`, {
      params: {...query, with:  withArray.join()},
    })
    if (reference) {
      reference.value = data
    }

    return data
}
  
  async function exportReport() {
    try {
      const { data: responseData } = await ApiService.query("homework/export", {
        params: {},
      });
      const link = responseData?.link ?? "";
      if (link) {
        window.open(link, "_blank")?.focus();
      }
    } catch (error) {
      console.error(error);
    }
}
async function exportCSV() {
  try {
    const { data: responseData } = await ApiService.query("homework/export/csv", {
      params: {},
    });
    const link = responseData?.url ?? "";
    if (link) {
      window.open(link, "_blank")?.focus();
    }
  } catch (error) {
    console.error(error);
  }
}
async function importCSV(payload: Object) {
  const { data } = await ApiService.post('homework/import', payload)
  return data
}

async function create(payload: homework): Promise<homework> {
    const { data } = await ApiService.post('homework', payload)
    return data
  }

  async function update(id: string | number, payload: typeof formData.value): Promise<homework> {
    const { data } = await ApiService.update(`homework/${id}`, payload)

    return data
  }


  function resetItemData() {
    //itemData.value = null;
  }


  async function deleteItem(id: number | string): Promise<homework> {
    const { data } = await ApiService.delete(`homework/${id}`)
    return data
  }
  async function assignItem(
    model: string,
    id: string,
    relationKey: string,
    payload: any
  ): Promise<serviceProviderStore> {
    const { data } = await ApiService.post(`${model}/${id}/attach/${relationKey}`, {
      payload
    })
    return data
  }
  async function detachItem(
    model: string,
    id: string,
    relationKey: string,
    payload: any
  ): Promise<serviceProviderStore> {
    const { data } = await ApiService.post(`${model}/${id}/detach/${relationKey}`, {
      payload
    })
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
    assignItem,
    detachItem,
    exportReport,
    exportCSV,
    importCSV,
    resetItems
  }
})
