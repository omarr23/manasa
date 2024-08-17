<template>
  <div class="card mb-3">
    <div class="card-header">
      <h2 class="p-4">{{ $t(`${props.relation!.relationCollection}._title`) }}</h2>
    </div>
    <div class="card-body">
      <DataTable
        :header="tableColumns"
        :modelName="relation?.relationCollection!"
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
      >
        <template
          v-for="tableColumn in props.provider.tableHeader.slice(0, -1)"
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

        <template v-slot:actions="{ row: data, index }">
          <div class="me-0">
            <button class="btn btn-light-primary" @click="detachItem(data.id)">
              {{ $t('action.detach') }}
            </button>
          </div>
        </template>
        <template v-slot:headerActions>
          <button
            @click="openManyToManyModal()"
            class="btn btn-flex btn-primary hover-elevate-up me-4"
          >
            {{ $t('action.assign') }}
            <KTIcon icon-name="plus" icon-class="fs-2" />
          </button>
          <DynamicFilter
            :id="relation!.relationKey"
            :filterFields="provider.filterFields.value"
            :filterFormData="provider.filterFormData.value"
            @onFilterSubmit="handleFilter"
            @resetFilter="handleResetFilter"
          />        
        </template>
      </DataTable>
    </div>
  </div>
  <ManyToManyRelationModal
    :listData="listModalData"
    :tableColumns="tableColumns"
    :relation="relation"
    :provider="provider"
    :idParams="id.toString"
    @handleSearchModal="handleSearchModal"
    @handleFilterModal="handleFilterModal"
    @handleResetFilterModal="handleResetFilterModal"
    @handleAssign="handleAssign"
  />
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import DataTable from '@/components/kt-datatable/KTDataTable.vue'
import InfoItemTable from '@/components/shared/InfoItemTable.vue'
import ManyToManyRelationModal from '@/components/shared/ManyToManyRelationModal.vue'
import { useRoute } from 'vue-router'
import { Modal } from 'bootstrap'
import DynamicFilter from '@/components/shared/DynamicFilter.vue'

const props = defineProps({
  listData: { type: Object },
  listModalData: { type: Object },
  provider: { type: Object },
  relationName: { type: String },
  relation: { type: Object },
  model: { type: String }
})
const routes = useRoute()
const id = routes.params.id
const emit = defineEmits()
const listDataRef = computed(() => {
  return props.listData.value
})

const handleSearch = (filter: string) => {
  emit('handleSearch', filter)
}
const handleFilter = (filter: string) => {
  emit('handleFilter', filter)
}
const handleResetFilter = () => {
  emit('handleResetFilter')
}
const handleFilterModal = (filter: string) => {
  emit('handleFilterModal', filter)
}
const handleResetFilterModal = () => {
  emit('handleResetFilterModal')
}
const handleSearchModal = (filter: string) => {
  emit('handleSearchModal', filter)
}
const handlePageChange = (page: number) => {
  emit('handlePageChange', page)
}
const handleOnPageSizeChange = (size: number) => {
  emit('handleOnPageSizeChange', size)
}
const detachItem = async (idItem: string | number) => {
  const confirmed = await Swal.fire({
    text: 'Are you sure you want to detach this item?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, detach it!',
    cancelButtonText: 'Cancel'
  })

  if (confirmed.isConfirmed) {
    let payload = [
      {
        key: {
          [props.relation.relationKey]: idItem
        }
      }
    ]
    emit('handleDetach', props.relationName, id, props.relation.relationModel, payload)
  }
}
const openManyToManyModal = () => {
  emit('handelOpenModal', props.relation.relationName, id, props.relation.relationKeyFilter)

  const modal = new Modal(document.getElementById(props.relation.relationModel) as Element)
  modal.show()
}

const handleAssign = (payload: any) => {
  emit('handleAssign', props.relationName, id, props.relation.relationModel, payload)
}
const params = { take: 10, totalElements: 10, totalPages: 10, page: 1 }
const tableColumns = props.provider.tableHeader

onMounted(async () => {})
</script>
