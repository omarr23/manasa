import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import ApiService from '@/core/services/ApiService'
import { reinitializeComponents } from '@/core/plugins/keenthemes'
import { DefaultParamsUserRole, type FilterQuery } from '@/@types/FilterQuery'
import type { PaginationResponse } from '@/@types/PaginationResponse'
import { setDefaults } from '@/core/helpers/defaults'
import { stripFilterQuery } from '@/core/helpers/filterQuery'
import { DefaultResponse } from '@/@types/DefaultValue'

export const useUserRoleStore = defineStore('userRole', () => {
  /* Router Config */

  const ListData = ref([])
  const itemData = ref(null)
  const permissions = ref(null)
  const assignedPermissions = ref([])

  const params = ref({
    page: 1,
    take: 10,
    totalPages: 0,
    totalElements: 0,
    filter: ''
  })

  /* Reset To Default Values */
  function resetItems() {
    ListData.value = []
    params.value = {
      page: 1,
      take: 10,
      totalPages: 0,
      totalElements: 0,
      filter: ''
    }
  }

  function fetchListRef(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<any>>
  ): Ref<PaginationResponse<any>> {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const listData = reference ?? ref<PaginationResponse<any>>(DefaultResponse)
    fetchListAsync(query, listData)
    return listData
  }

  async function fetchListAsync(
    query?: FilterQuery,
    reference?: Ref<PaginationResponse<any>>
  ): Promise<PaginationResponse<any>> {
    query = setDefaults(query, DefaultParamsUserRole)
    stripFilterQuery(query!)
    // TODO: dont try catch here, because logic may differ from page to page
    const { data } = await ApiService.query(`${import.meta.env.VITE_APP_AUTH_BASE_URL}roles`, {
      params: query
    })
    if (reference) {
      reference.value = data
    }
    return data
  }

  function getAssignedPermissionsListRef(code: any, reference?: any): any {
    // // first get or create a new reference
    // I am not sure about the behavior of ref function from vue, so I am assuming it copies into new reference
    // if not, use the set defaults as follows: setDefaults({}, defaultResponse)
    const listData = reference ?? DefaultResponse
    getAssignedPermissionsListAsync(code, listData)
    return listData
  }

  async function getAssignedPermissionsListAsync(code: any, reference?: any): Promise<any> {
    try {
      ApiService.setHeader()
      const query: FilterQuery = {}
      query.with = 'roleTranslations,'
      const { data } = await ApiService.get(
        `${import.meta.env.VITE_APP_AUTH_BASE_URL}roles/${code}/allAssignedPermissions`
      )

      if (reference) {
        reference.value = data
      }
      return data
    } catch (error) {
      return error
    }
  }

  async function getPermissionsList(): Promise<any> {
    ApiService.setHeader()
    const query: FilterQuery = {}
    query.filter = `permissionType eq "appPermission" or permissionType eq "authPermission"`
    const { data } = await ApiService.query(
      `${import.meta.env.VITE_APP_AUTH_BASE_URL}permissions`,
      {
        params: query
      }
    )

    // Define the desired order of permissions
    const desiredOrder = ['create', 'delete', 'update', 'list', 'view', 'ownership']
    const permissionsData: any = {}

    // Populate permissionsData
    for (let i = 0; i < data.length; i++) {
      const item = data[i]
      if (desiredOrder.includes(item.permission)) {
        if (permissionsData[item.entity]) {
          permissionsData[item.entity].push(item)
        } else {
          permissionsData[item.entity] = [item]
        }
      }
    }

    // Sort permissionsData based on the desired order
    for (const entity in permissionsData) {
      permissionsData[entity].sort((a, b) => {
        return desiredOrder.indexOf(a.permission) - desiredOrder.indexOf(b.permission)
      })
    }
    permissions.value = permissionsData
    return permissionsData
  }
  
  async function assignPermission(permission: any, code: any): Promise<any> {
    ApiService.setHeader()
    if (permission && permission.id) {
      const { data } = await ApiService.put(
        `${import.meta.env.VITE_APP_AUTH_BASE_URL}roles/${code}/assignedPermission/${permission.id
        }`,
        {
          ...permission,
          roleCode: code
        }
      )
      await getAssignedPermissionsListAsync(code)
      return data
    } else {
      const { data } = await ApiService.post(
        `${import.meta.env.VITE_APP_AUTH_BASE_URL}roles/assignPermission`,
        {
          ...permission,
          roleCode: code
        }
      )
      await getAssignedPermissionsListAsync(code)
      return data
    }
  }

  async function createRole(role: any): Promise<any> {
    ApiService.setHeader()
    const { data } = await ApiService.vueInstance.axios.post(
      `${import.meta.env.VITE_APP_AUTH_BASE_URL}roles`,
      role
    )

    return data
  }
  async function getRole(code: any): Promise<any> {
    ApiService.setHeader()
    const query: FilterQuery = {}
    query.with = 'roleTranslations'
    const { data } = await ApiService.query(
      `${import.meta.env.VITE_APP_AUTH_BASE_URL}roles/${code}`,
      {
        params: query
      }
    )
    itemData.value = data
    return data
  }
  async function updateRole(role: any) {
    ApiService.setHeader()
    const { data } = await ApiService.put(
      `${import.meta.env.VITE_APP_AUTH_BASE_URL}roles/${role.code}`,
      role
    )
    return data
  }

  async function deleteItem(id: any) {
    const { data } = await ApiService.delete(`${import.meta.env.VITE_APP_AUTH_BASE_URL}roles/${id}`)
    return data
  }
  function resetItemData() {
    itemData.value = null
  }

  // Return the properties and functions to be used in the component
  return {
    /* List Table */
    ListData,
    params,
    /* View Item */
    itemData,
    permissions,
    assignedPermissions,

    /* Func */
    fetchListAsync,
    fetchListRef,
    resetItems,
    resetItemData,
    getAssignedPermissionsListAsync,
    getAssignedPermissionsListRef,
    getPermissionsList,
    assignPermission,
    createRole,
    getRole,
    updateRole,
    deleteItem
  }
})
