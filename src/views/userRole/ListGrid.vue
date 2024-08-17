<template>
    <div class="card">
      <div class="card-body">
        <Datatable
          :header="tableHeader"
          modelName="userRole"
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
          <template v-slot:code="{ row: data }">
            <info-item-table class="badge" :data="data.code" type="string" />
          </template>
          <template v-slot:parentRoleCode="{ row: data }">
            <info-item-table
              class="badge"
              :data="data.parentRoleCode"
              type="string"
            />
          </template>
          <template v-slot:roleTranslations[0].description="{ row: data }">
            <info-item-table
              class="badge"
              :data="data.roleTranslations[0].description"
              type="string"
            />
          </template>
          <template v-slot:status="{ row: data }">
            <info-item-table class="badge" :data="data.status" type="boolean" />
          </template>
  
          <template v-slot:actions="{ row: data, index }">
            <div class="me-0">
              <button
                class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                :id="'dropdownButton-' + data.code"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                data-kt-menu-flip="top-end"
              >
                <i class="bi bi-three-dots fs-3"></i>
              </button>
              <div
                :id="'dropdownMenu-' + data.code"
                class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-100px fs-6"
                data-kt-menu="true"
              >
                <div class="menu-item px-3">
                  <router-link
                    class="menu-link px-3"
                    :to="{
                      name: 'userRole-view',
                      params: { id: data.code },
                    }"
                  >
                    View
                  </router-link>
                </div>
                <div class="menu-item px-3">
                  <router-link
                    class="menu-link px-3"
                    :to="{
                      name: 'userRole-edit',
                      params: { id: data.code },
                    }"
                  >
                    Edit
                  </router-link>
                </div>
                <div class="menu-item px-3">
                  <a @click="submitDelete(data.code)" class="menu-link px-3">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </template>
          <template v-slot:headerActions>
            <div
              class="d-flex justify-content-end mx-5"
              data-kt-attribute-table-toolbar="base"
            >
              <button type="button" class="btn btn-warning" @click="exportReport">
                <KTIcon icon-name="file-up" icon-class="fs-2" />
                {{ $t(`userRole.export`) }}
                {{ $t(`userRole.report`) }}
              </button>
            </div>
            <div
              class="d-flex justify-content-end"
              data-kt-attribute-table-toolbar="base"
            >
              <router-link
                :to="{ name: `userRole-create` }"
                type="button"
                class="btn btn-primary"
              >
                <KTIcon icon-name="plus" icon-class="fs-2" />
                {{ $t("userRole.add") }}
                {{ $t(`userRole._title`) }}
              </router-link>
            </div>
          </template>
        </Datatable>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from "vue";
  
  /* Locale Components */
  import Datatable from "@/components/kt-datatable/KTDataTable.vue";
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import InfoItemTable from "@/components/shared/InfoItemTable.vue";
  
  /* Providers */
  import { tableHeader } from "@/providers/userRole";
  
  /* Store */
  import { useUserRoleStore } from "@/stores/userRole";
  import { DefaultParams, type FilterQuery } from "@/@types/FilterQuery";
  
  const store = useUserRoleStore();
  const params = ref<FilterQuery>(DefaultParams());
  const listDataRef = store.fetchListRef();
  const submitDelete = async (id: string | number) => {
    const confirmed = await Swal.fire({
      text: "Are you sure you want to delete this BusinessUnit?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });
  
    if (confirmed.isConfirmed) {
      await store.deleteItem(id).then(() => {
        Swal.fire({
          text: "Deleted Successfully!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        });
        store.fetchListAsync();
      });
    }
  };
  
  const onPageSizeChange = async (size: number) => {
    params.value.take = size;
    store.fetchListRef(params.value, listDataRef);
  };
  const handlePageChange = (page: number) => {
    params.value.page = page;
    store.fetchListRef(params.value, listDataRef);
  };
  const exportReport = () => {};
  const handleSearch = (filter: string) => {
    //there is a problem her
    params.value.filter = filter; //errrooorrrrrrr empty string
    store.fetchListRef(params.value, listDataRef);
  };
  
  onMounted(async () => {});
  onUnmounted(() => {
    store.resetItems();
  });
  </script>
  