<template>
  <div class="card mb-3">
    <div class="card-header">
      <h2 class="m-4">{{ filters.ConvertCamelToTitleName($t(`${relationName}._title`)) }}</h2>
    </div>
    <div class="card-body">
      <DataTable
        :header="tableColumns"
        :modelName="relationName!"
        :data="listDataRef.content"
        :items-per-page="params.take"
        :items-per-page-dropdown-enabled="false"
        :total="listDataRef.totalElements"
        :total-pages="listDataRef.totalPages"
        :currentPage="listDataRef.page"
        :searchable="true"
        @on-page-size-change="handleOnPageSizeChange"
        @page-change="handlePageChange"
        @on-search="handleSearch"
        @exportReport="handelExportReport"
      >
        <template
          v-for="tableColumn in tableColumns"
          :key="tableColumn.columnLabel"
          v-slot:[tableColumn.columnLabel]="{ row: data }"
        >
          <InfoItemTable
            class="badge"
            :data="data[tableColumn.columnLabel]"
            :type="tableColumn.type"
            :displayName="tableColumn.displayName"
          >
          </InfoItemTable>
        </template>
        <template v-slot:headerActions>
          <DynamicFilter
            :filterFields="provider.filterFields.value"
            :filterFormData="provider.filterFormData.value"
            @onFilterSubmit="handleFilter"
            @resetFilter="handleResetFilter"
          />
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue'
import DataTable from '@/components/kt-datatable/KTDataTable.vue'
import InfoItemTable from '@/components/shared/InfoItemTable.vue'
import DynamicFilter from '@/components/shared/DynamicFilter.vue'
import type { PaginationResponse } from '@/@types/PaginationResponse'
import filters from '@/core/helpers/filters'

export default defineComponent({
  name: 'OneToManyRelationGrid',
  components: {
    DataTable,
    InfoItemTable,
    DynamicFilter
  },
  props: {
    listData: null,
    provider: Object,
    filterFormData: null,
    relationName: String
  },
  setup(props, { emit }) {
    // TODO: opt1
    const listDataRef = computed(() => {
      return props.listData.value
    })
    const handleFilter = (filter: string) => {
      emit('handleFilter', filter)
    }
    const handleResetFilter = () => {
      emit('handleResetFilter')
    }
    const handleSearch = (filter: string) => {
      emit('handleSearch', filter)
    }
    const handlePageChange = (page: number) => {
      emit('handlePageChange', page)
    }
    const handelExportReport = () => {
      emit('handelExportReport')
    }
    const handleOnPageSizeChange = (size: number) => {
      emit('handleOnPageSizeChange', size)
    }
    const params = { take: 10, totalElements: 10, totalPages: 10, page: 1 }
    const tableColumns = props.provider!.tableHeader
    onMounted(async () => {})
    return {
      params,
      tableColumns,
      listDataRef,
      handleSearch,
      handleOnPageSizeChange,
      handelExportReport,
      handlePageChange,
      handleFilter,
      handleResetFilter,
      filters
    }
  }
})
</script>
