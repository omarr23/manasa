<template>
  <!-- List Header With Search and Filters -->
  <TableCardHeader
    model="video"
    :listDataRef="listDataRef"
    :filterFields="filterFields"
    :filterFormData="filterFormData"
    @submitFilters="submitFilters"
    @uploadCSV="handleCSVUpload"
    @exportCSV="exportCSV"
    @exportReport="exportReport" />

    <div class="card">
        <div class="card-body table-div">
                <Datatable
                modelName="video"
                :header="tableHeader"
                :data="listDataRef.content"
                :items-per-page="listDataRef.size"
                :items-per-page-dropdown-enabled="false"
                :total="listDataRef.totalElements"
                :total-pages="listDataRef.totalPages"
                :currentPage="listDataRef.page"
                @on-page-size-change="onPageSizeChange"
                @page-change="handlePageChange"
                >
                <template v-slot:title="{ row: data }">
                    <info-item-table :data="data.title" type="string"/>
                </template>
                <template v-slot:urlServer1="{ row: data }">
                    <info-item-table :data="data.urlServer1" type="string"/>
                </template>
                <template v-slot:urlServer2="{ row: data }">
                    <info-item-table :data="data.urlServer2" type="string"/>
                </template>
                <template v-slot:urlServer3="{ row: data }">
                    <info-item-table :data="data.urlServer3" type="string"/>
                </template>
                <template v-slot:thumbnail="{ row: data }">
                    <info-item-table :data="data.thumbnail" type="image"/>
                </template>
                <template v-slot:details="{ row: data }">
                    <info-item-table :data="data.details" type="text"/>
                </template>
                <template v-slot:activationcode="{ row: data }">
                    <info-item-table :data="data.activationcode" type="string"/>
                </template>
                <template v-slot:createdAt="{ row: data }">
                    <info-item-table :data="data.createdAt" type="createdAt"/>
                </template>
                <template v-slot:modifiedAt="{ row: data }">
                    <info-item-table :data="data.modifiedAt" type="modifiedAt"/>
                </template>
                

                <template v-slot:owner="{ row: data }">
                  <info-item-table :data="data.owner" type="hasOne" displayName="email" />
                </template>
                <template v-slot:businessUnit="{ row: data }">
                  <info-item-table :data="data.businessUnit" type="hasOne" displayName="code" />
                </template>
                <template v-slot:createdBy="{ row: data }">
                  <info-item-table :data="data.createdBy" type="hasOne" displayName="email" />
                </template>
                <template v-slot:modifiedBy="{ row: data }">
                  <info-item-table :data="data.modifiedBy" type="hasOne" displayName="email" />
                </template>
                <template v-slot:videoTeacher="{ row: data }">
                  <info-item-table :data="data.videoTeacher" type="hasOne" displayName="name" />
                </template>


                <template v-slot:actions="{ row: data, index }">
                    <div class="text-end">
                        <router-link
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          :to="{ name: 'video-view', params: { id: data.id } }"
                          v-if="can('view', 'video')"
                          >
                          <KTIcon icon-class="fs-3" icon-name="eye" />
                        </router-link>

                        <router-link
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                          :to="{ name: 'video-edit',params: { id: data.id }}"
                          v-if="can('update', 'video')"
                          >
                          <KTIcon icon-class="fs-3" icon-name="pencil" />
                        </router-link>

                        <a
                          class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                          @click="submitDelete(data.id)"
                          v-if="can('delete', 'video')"
                          >
                          <KTIcon icon-class="fs-3" icon-name="trash" />
                        </a>
                    </div>
                </template>
            </Datatable>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useAbility } from "@casl/vue";

import * as _ from 'lodash'

/* Locale Components */
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import Swal from "sweetalert2/dist/sweetalert2.js";

/* Providers */
import {tableHeader, filterFields, filterFormData} from '@/providers/video';
import InfoItemTable from '@/components/shared/InfoItemTable.vue'
import TableCardHeader from '@/components/kt-datatable/TableCardHeader.vue';

/* Store */
import { useVideoStore } from '@/stores/video';
import { DefaultParams, type FilterQuery } from '@/@types/FilterQuery'


const store = useVideoStore();
const params = ref<FilterQuery>(DefaultParams())
const listDataRef = store.fetchListRef()
const { can } = useAbility();

const submitDelete = async (id: String | Number) => {
  const confirmed = await Swal.fire({
    text: 'Are you sure you want to delete this Video?',
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

const submitFilters = (filter: String) => {
  params.value.filter = filter;
  store.fetchListRef(params.value, listDataRef);
};

const onPageSizeChange = async (size: number) => {
  params.value.take = size
  store.fetchListRef(params.value, listDataRef)
}

const handlePageChange = (page: number) => {
  params.value.page = page
  store.fetchListRef(params.value, listDataRef)
}

const handleCSVUpload = async (fileData: any) => {
  const res = store.importCSV(fileData);
  if (res) {
    Swal.fire({
      text: "Uploaded Successfully!",
      icon: "success",
      buttonsStyling: false,
      confirmButtonText: "Ok, got it!",
      heightAuto: false,
      customClass: {
        confirmButton: "btn fw-semobold btn-light-primary",
      },
    });
  }
};

const exportCSV = () => {
  store.exportCSV();
};

const exportReport = () => {
  store.exportReport();
};
</script>
