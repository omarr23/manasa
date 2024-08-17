<template>
  <div
    class="modal fade"
    :id="relation.relationModel"
    ref="newTargetModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content" style="height: 100vh">
        <!-- Modal header -->
        <div class="modal-header">
          <div class="d-flex align-items-center position-relative my-1">
            <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
            <input
              v-model="searchTerm"
              @input="handleSearchModal"
              type="text"
              data-kt-subscription-table-filter="search"
              class="form-control form-control-solid w-250px ps-14"
              :placeholder="$t('action.search')"
            />
          </div>
          <DynamicFilter
            :filterFields="provider.filterFields.value"
            :filterFormData="provider.filterFormData.value"
            @onFilterSubmit="handleFilterModal"
            @resetFilter="handleResetFilterModal"
          /> 
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <el-table
            ref="multipleTable"
            :data="listDataRef.content"
            style="width: 100%"
            :select-on-indeterminate="false"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection"> </el-table-column>

            <el-table-column
              v-for="item in tableColumns"
              :key="item.columnLabel"
              :label="$t(`${relation.relationCollection}.${item.columnLabel}`)"
            >
              <template #default="scope">
                <InfoItemTable
                  class="badge"
                  :data="scope.row[item.columnLabel]"
                  :type="item.type"
                  :displayName="item.displayName"
                />
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="submit">
            Submit
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { Modal } from 'bootstrap'
import InfoItemTable from '@/components/shared/InfoItemTable.vue'
import DynamicFilter from './DynamicFilter.vue'

const multipleSelection = ref([])
const searchTerm = ref('')
const newTargetModalRef = ref<null | HTMLElement>(null)

const props = defineProps({
  listData: { type: Object },
  relation: { type: Object, required: true },
  tableColumns: { type: Object, required: true },
  provider: { type: Object, required: true },
  idParams: { type: String, required: true }
})
const emit = defineEmits(['handleAssign', 'handleSearchModal', 'handleFilterModal','handleResetFilterModal'])

const listDataRef = computed(() => {
  return props.listData.value
})
const handleFilterModal = (filter: string) => {
  emit('handleFilterModal', filter)
}
const handleResetFilterModal = () => {
  emit('handleResetFilterModal')
}
const handleSearchModal = () => {
  emit('handleSearchModal', `scope search ("${searchTerm.value}")`)
}

const handleSelectionChange = (val) => {
  val.map((item: any) => {
    if (!multipleSelection.value.includes(item)) {
      multipleSelection.value.push(item)
    }
  })
}
// Function to handle form submission
const submit = async () => {
  let payload = multipleSelection.value.map((item) => {
    return {
      key: {
        [props.relation.relationKey]: item[props.relation.relationId]
      }
    }
  })
  multipleSelection.value = []

  emit('handleAssign', payload)
}

// Function to close the modal
const closeModal = () => {
  multipleSelection.value = []
  searchTerm.value = ''
  const modal = Modal.getInstance(newTargetModalRef.value)
  modal?.hide()
}
onMounted(async () => {})
</script>
