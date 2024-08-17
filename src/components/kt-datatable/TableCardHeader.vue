<template>
  <div class="card mb-7">
    <!--begin::Card body-->
    <div class="card-body">
      <!--begin::Compact form-->
      <div class="d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center">
          <!--begin::Input group-->
          <div class="position-relative w-md-400px me-md-5">
            <i
              class="ki-outline ki-magnifier fs-3 text-gray-500 position-absolute top-50 translate-middle ms-6"></i>
            <input
              type="text"
              class="form-control form-control-solid ps-10"
              name="search"
              placeholder="Search"
              v-model="searchFilterRef"
              @input="updateAndSendParamsFilter" />
          </div>
          <!--end::Input group-->
          <!--begin:Action-->
          <div class="d-flex align-items-center">
            <a
              href="#"
              id="kt_horizontal_search_advanced_link"
              class="btn btn-link"
              data-bs-toggle="collapse"
              data-bs-target="#kt_advanced_search_form">
              Advanced Search
            </a>
          </div>
          <!--end:Action-->
        </div>

        <div>
          <button
            class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end">
            <KTIcon icon-name="category" icon-class="fs-2" />
          </button>
          <div
            class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semibold py-4 w-250px fs-6"
            data-kt-menu="true">
            <!--begin::Menu item-->
            <div class="menu-item px-5">
              <a class="menu-link flex-stack px-5" @click="emits('exportCSV')">
                Export CSV
                <i class="fa-solid fa-file-csv ms-2 fs-7"></i>
              </a>
            </div>
            <!--end::Menu item-->

            <!--begin::Menu item-->
            <div class="menu-item px-5">
              <el-upload
                :on-change="
                  (file) => handleCSVUpload(field?.name, ['csv'], file)
                "
                :before-upload="() => false">
                <a href="#" class="menu-link flex-stack px-5">
                  Import CSV
                  <i class="fa-solid fa-file-csv ms-2 fs-7"></i>
                </a>
              </el-upload>
            </div>
            <!--end::Menu item-->

            <!--begin::Menu item-->
            <div class="menu-item px-5">
              <a
                class="menu-link flex-stack px-5"
                @click="emits('exportReport')">
                Export Report
                <i class="fa-solid fa-sheet-plastic ms-2 fs-7"></i>
              </a>
            </div>
            <!--end::Menu item-->
          </div>
        </div>
      </div>
      <!--end::Compact form-->
      <!--begin::Advance form-->
      <div class="collapse" id="kt_advanced_search_form">
        <!--begin::Separator-->
        <div class="separator separator-dashed mt-9 mb-6"></div>
        <!--end::Separator-->

        <DynamicFilter
          :filterFields="props.filterFields"
          :filterFormData="props.filterFormData"
          @submit="onFilterSubmit"
          @reset="onResetFilter" />
      </div>
      <!--end::Advance form-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->

  <div class="d-flex flex-wrap flex-stack pb-7">
    <div class="d-flex flex-wrap align-items-center my-1">
      <h3 class="fw-bold me-5 my-1">
        {{ listDataRef.totalElements }} Items Found
        <span class="text-gray-500 fs-6">by Recent Updates ↓</span>
      </h3>
    </div>

    <div class="d-flex flex-wrap my-1">
      <div class="d-flex">
        <router-link
          :to="{ name: `${props.model}-create` }"
          class="btn btn-sm btn-light-primary">
          <KTIcon icon-class="fs-3" icon-name="plus" />
          New {{ props.model }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Collapse } from "bootstrap";
import { useMediaStore } from "@/stores/media";
import DynamicFilter from "@/components/shared/DynamicFilter.vue";

const props = defineProps({
  model: String,
  listDataRef: Object,
  filterFields: Array,
  filterFormData: Object,
});
const emits = defineEmits([
  "submitFilters",
  "uploadCSV",
  "exportCSV",
  "exportReport",
]);
const media = useMediaStore();

const searchFilterRef = ref("");
const filterRef = ref([]);

const updateAndSendParamsFilter = () => {
  const search = searchFilterRef.value.length
    ? `scope search ("${searchFilterRef.value}")`
    : "";

  const filters = filterRef.value?.join(" and ");

  // Combine baseFilter, searchFilter, and other filters
  const combinedFilters = [search, filters].filter((f) => f && f.length > 0);
  emits("submitFilters", combinedFilters.join(" and "));
};

const onFilterSubmit = (filter) => {
  filterRef.value = filter;
  updateAndSendParamsFilter();
};

const onResetFilter = () => {
  filterRef.value = [];
  updateAndSendParamsFilter();

  new Collapse(document.getElementById("kt_advanced_search_form")).hide();
};

const handleCSVUpload = async (name, allowedExtensions, file) => {
  const fileExtension = file.name.split(".").pop()?.toLowerCase();
  const isValidExtension = allowedExtensions.some((ext) => {
    return ext.toLowerCase().includes(fileExtension);
  });

  if (!isValidExtension) {
    Swal.fire({ icon: "error", title: "Error", text: "Invalid File Type" });
    return;
  }

  const fileData = await media.fileUpload(file.raw);
  emit("uploadCSV", fileData);
};
</script>

<style>
.el-upload {
  width: 100%;
}

.el-upload-list {
  display: none;
}
</style>
