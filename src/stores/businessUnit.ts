import { defineStore } from "pinia";
import { ref, type Ref } from 'vue'
import { formData, type businessUnit, withArray } from '@/providers/businessUnit'
import type { PaginationResponse } from '@/@types/PaginationResponse'
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'
import { DefaultResponse } from '@/@types/DefaultValue'
import { setDefaults } from '@/core/helpers/defaults'
import { stripFilterQuery } from '@/core/helpers/filterQuery'
import ApiService from "@/core/services/ApiService";

export const useBusinessUnitStore = defineStore("businessUnit", () => {
 
// Use this for shared components, I would recommend a map object
  const memoryRef = ref({})

  // Reset To Default Values 
  function resetItems() {
    memoryRef.value = {}
}
  
  function fetchListRef(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<businessUnit>>
  ): Ref<PaginationResponse<businessUnit>> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const listData = reference ?? ref<PaginationResponse<businessUnit>>(DefaultResponse)
    fetchListAsync(query, listData)
    return listData
  }


  async function fetchListAsync(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<businessUnit>>
  ): Promise<PaginationResponse<businessUnit>> {
    query = setDefaults(query, DefaultParams())
    stripFilterQuery(query!)

    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query('businessUnit', {
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
    reference?: Ref<businessUnit>
  ): Ref<businessUnit | null> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const itemData = reference ?? ref<businessUnit | null>(null)
    fetchItemAsync(id, query, itemData)

    return itemData
}
  
  async function fetchItemAsync(
    id: String,
    query?: FilterQuery,
    reference?: Ref<businessUnit | null>
  ): Promise<businessUnit> {
    
    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query(`businessUnit/${id}`, {
      params: {...query, with:  withArray.join()},
    })
    if (reference) {
      reference.value = data
    }

    return data
}
  
  async function exportReport() {
    try {
      const { data: responseData } = await ApiService.query("businessUnit/export", {
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
    const { data: responseData } = await ApiService.query("businessUnit/export/csv", {
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
  const { data } = await ApiService.post('businessUnit/import', payload)
  return data
}

async function create(payload: businessUnit): Promise<businessUnit> {
    const { data } = await ApiService.post('businessUnit', payload)
    return data
  }

  async function update(id: string | number, payload: typeof formData.value): Promise<businessUnit> {
    const { data } = await ApiService.update(`businessUnit/${id}`, payload)

    return data
  }


  function resetItemData() {
    //itemData.value = null;
  }


  async function deleteItem(id: number | string): Promise<businessUnit> {
    const { data } = await ApiService.delete(`businessUnit/${id}`)
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
