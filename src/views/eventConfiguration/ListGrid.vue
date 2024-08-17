<template>
  <div class="card">
    <div class="card-body table-div">
      <Datatable
        :header="tableHeader"
        modelName="eventConfiguration"
        :data="listDataRef.content"
        :items-per-page="listDataRef.size"
        :items-per-page-dropdown-enabled="false"
        @page-change="handlePageChange"
        :total="listDataRef.totalElements"
        :total-pages="listDataRef.totalPages"
        :currentPage="listDataRef.page"
        @on-search="handleSearch"
        :searchable="true"
        @on-page-size-change="onPageSizeChange"
      >
        <template v-slot:name="{ row: data }">
          <info-item-table class="badge" :data="data.name" type="string" />
        </template>
        <template v-slot:event="{ row: data }">
          <info-item-table class="badge" :data="data.event" type="string" />
        </template>
        <template v-slot:entity="{ row: data }">
          <info-item-table class="badge" :data="data.entity" type="string" />
        </template>
        <template v-slot:hookUrl="{ row: data }">
          <info-item-table class="badge" :data="data.hookUrl" type="string" />
        </template>
        <template v-slot:createdAt="{ row: data }">
          <info-item-table class="badge" :data="data.createdAt" type="createdAt" />
        </template>
        <template v-slot:modifiedAt="{ row: data }">
          <info-item-table class="badge" :data="data.modifiedAt" type="modifiedAt" />
        </template>

        <template v-slot:actions="{ row: data, index }">
          <div class="me-0">
            <button
              class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
              :id="'dropdownButton-' + data.id"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
            >
              <i class="bi bi-three-dots fs-3"></i>
            </button>
            <div
              :id="'dropdownMenu-' + data.id"
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-100px fs-6"
              data-kt-menu="true"
            >
              <div class="menu-item px-3" v-if="can('view', 'eventConfiguration')">
                <router-link
                  class="menu-link px-3"
                  :to="{ name: 'eventConfiguration-view', params: { id: data.id } }"
                >
                  {{ $t('action.view') }}
                </router-link>
              </div>
              <div class="menu-item px-3" v-if="can('update', 'eventConfiguration')">
                <router-link
                  class="menu-link px-3"
                  :to="{ name: 'eventConfiguration-edit', params: { id: data.id } }"
                >
                  {{ $t('action.edit') }}
                </router-link>
              </div>
              <div class="menu-item px-3" v-if="can('delete', 'eventConfiguration')">
                <a @click="submitDelete(data.id)" class="menu-link px-3">
                  {{ $t('action.delete') }}
                </a>
              </div>
            </div>
          </div>
        </template>
        <template v-slot:headerActions>
          <div class="d-flex justify-content-end mx-5" data-kt-attribute-table-toolbar="base">
            <button type="button" class="btn btn-info" @click="exportCSV">
              <KTIcon icon-name="file-up" icon-class="fs-2" />
              {{ $t(`action.export`) }}
              {{ $t(`action.csv`) }}
            </button>
          </div>
          <div class="d-flex justify-content-end mx-5" data-kt-attribute-table-toolbar="base">
            <el-upload
              :on-change="
                (file:File) =>
                    handleCSVUpload(field?.name, ['csv'], file)
            "
              :before-upload="() => false"
            >
              <button type="button" class="btn btn-success mt-4">
                <KTIcon icon-name="file-down" icon-class="fs-2" />
                {{ $t(`action.import`) }}
                {{ $t(`action.csv`) }}
              </button>
            </el-upload>
          </div>
          <div class="d-flex justify-content-end mx-5" data-kt-attribute-table-toolbar="base">
            <button type="button" class="btn btn-warning" @click="exportReport">
              <KTIcon icon-name="file-up" icon-class="fs-2" />
              {{ $t(`eventConfiguration.export`) }}
              {{ $t(`eventConfiguration.report`) }}
            </button>
          </div>
          <div
            class="d-flex justify-content-end mx-5"
            data-kt-attribute-table-toolbar="base"
            v-if="can('create', 'eventConfiguration')"
          >
            <router-link
              :to="{ name: `eventConfiguration-create` }"
              type="button"
              class="btn btn-primary"
            >
              <KTIcon icon-name="plus" icon-class="fs-2" />
              {{ $t('action.add') }}
              {{ $t(`eventConfiguration._title`) }}
            </router-link>
          </div>
          <div class="d-flex justify-content-end" data-kt-attribute-table-toolbar="base">
            <DynamicFilter
              :filterFields="filterFields"
              :filterFormData="filterFormData"
              @onFilterSubmit="handleFilter"
              @resetFilter="resetFilter"
            />
          </div>
        </template>
      </Datatable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useAbility } from '@casl/vue'

import DynamicFilter from '@/components/shared/DynamicFilter.vue'
import * as _ from 'lodash'

/* Locale Components */
import Datatable from '@/components/kt-datatable/KTDataTable.vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

/* Providers */
import { tableHeader, filterFields, filterFormData } from '@/providers/eventConfiguration'
import InfoItemTable from '@/components/shared/InfoItemTable.vue'

/* Store */
import { useEventConfigurationStore } from '@/stores/eventConfiguration'
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'

import { useMediaStore } from '@/stores/media'

const media = useMediaStore()

const store = useEventConfigurationStore()
const params = ref<FilterQuery>(DefaultParams())
const listDataRef = store.fetchListRef()
const filterRef = ref<Array<any>>([])
const searchFilterRef = ref<string>('')
const { can } = useAbility()

const submitDelete = async (id: String | Number) => {
  const confirmed = await Swal.fire({
    text: 'Are you sure you want to delete this BusinessUnit?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })

  if (confirmed.isConfirmed) {
    await store.deleteItem(id.toString()).then(async () => {
      Swal.fire({
        text: 'Deleted Successfully!',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok, got it!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn fw-semobold btn-light-primary'
        }
      })
      store.fetchListRef(params.value, listDataRef)
    })
  }
}
const handleFilter = (filters: Array<string>) => {
  filterRef.value = filters
  updateParamsFilter()
  store.fetchListRef(params.value, listDataRef)
}
const resetFilter = () => {
  filterRef.value = []
  updateParamsFilter()
  store.fetchListRef(params.value, listDataRef)
}
const onPageSizeChange = async (size: number) => {
  params.value.take = size
  store.fetchListRef(params.value, listDataRef)
}
const handlePageChange = (page: number) => {
  params.value.page = page
  store.fetchListRef(params.value, listDataRef)
}
const exportReport = () => {
  store.exportReport()
}
const handleSearch = (searchTerm: string) => {
  searchFilterRef.value = searchTerm
  updateParamsFilter()
  store.fetchListRef(params.value, listDataRef)
}
const updateParamsFilter = () => {
  // Combine baseFilter, searchFilter, and other filters
  const combinedFilters = [searchFilterRef.value, filterRef.value?.join(' and ')].filter(
    (f) => f && f.length > 0
  )
  params.value.filter = combinedFilters.join(' and ')
}
const exportCSV = () => {
  store.exportCSV()
}

const handleCSVUpload = async (name: string, allowedExtensions: Array<any>, file: File | any) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  const isValidExtension = allowedExtensions.some((ext) => {
    return ext.toLowerCase().includes(fileExtension)
  })
  if (!isValidExtension) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Invalid File Type'
    }).then(() => {})
    return
  }

  const fileData = await media.fileUpload(file.raw)
  const res = store.importCSV(fileData)
  if (res) {
    Swal.fire({
      text: 'Uploaded Successfully!',
      icon: 'success',
      buttonsStyling: false,
      confirmButtonText: 'Ok, got it!',
      heightAuto: false,
      customClass: {
        confirmButton: 'btn fw-semobold btn-light-primary'
      }
    })
  }
}

onMounted(async () => {})
</script>
