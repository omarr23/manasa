<template>
  <section>
    <div id="kt_app_content_container" class="app-container container-fluid">
      <div class="card mb-5 mb-xl-10" id="kt_eventConfiguration_details_view">
        <div class="card-header cursor-pointer">
          <!--begin::Card title-->
          <div class="card-title m-0">
            <h3 class="fw-bold m-0">
              {{ filters.ConvertCamelToTitleName($t('eventConfiguration._title')) }}
              {{ $t('eventConfiguration.details') }}
            </h3>
          </div>
          <!--end::Card title-->
          <div>
            <button
              class="btn btn-sm btn-icon btn-active-color-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
              data-kt-menu-flip="top-end"
            >
              <i class="bi bi-three-dots fs-3"></i>
            </button>

            <div
              class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-semobold py-4 w-100px fs-6"
              data-kt-menu="true"
            >
              <div class="menu-item px-5">
                <router-link
                  :to="{ name: 'eventConfiguration-edit', params: { id: viewData?.id } }"
                  class="menu-link align-self-center"
                  v-if="can('update', 'eventConfiguration')"
                >
                  {{ $t('action.edit') }}
                </router-link>
              </div>
              <div class="menu-item px-5">
                <a
                  @click="submitDelete()"
                  href="#"
                  class="menu-link align-self-center text-danger"
                  v-if="can('delete', 'eventConfiguration')"
                >
                  {{ $t('action.delete') }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!--begin::Card body-->
        <div class="p-9">
          <!--begin::Row-->
          <div class="row mb-7">
            <div v-if="viewData" class="row">
              <!-- Info: Left col -->
              <div class="col-12">
                <div class="row">
                  <div class="mb-3 col-lg-6">
                    <!-- name -->
                    <info-item
                      :label="$t('eventConfiguration.name')"
                      :data="viewData.name"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- event -->
                    <info-item
                      :label="$t('eventConfiguration.event')"
                      :data="viewData.event"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- entity -->
                    <info-item
                      :label="$t('eventConfiguration.entity')"
                      :data="viewData.entity"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- hookUrl -->
                    <info-item
                      :label="$t('eventConfiguration.hookUrl')"
                      :data="viewData.hookUrl"
                      type="string"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- createdAt -->
                    <info-item
                      :label="$t('eventConfiguration.createdAt')"
                      :data="viewData.createdAt"
                      type="createdAt"
                    />
                  </div>
                  <div class="mb-3 col-lg-6">
                    <!-- modifiedAt -->
                    <info-item
                      :label="$t('eventConfiguration.modifiedAt')"
                      :data="viewData.modifiedAt"
                      type="modifiedAt"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--end::Card body-->
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useEventConfigurationStore } from '@/stores/eventConfiguration'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import type { eventConfiguration } from '@/providers/eventConfiguration'
import * as eventConfigurationProvider_ from '@/providers/eventConfiguration'
import { relations } from '@/providers/eventConfiguration'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import OneToManyRelationGrid from '@/components/shared/OneToManyRelationGrid.vue'
import ManyToManyRelationGrid from '@/components/shared/ManyToManyRelationGrid.vue'
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from '@casl/vue'
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'

const router = useRouter()
const { can } = useAbility()
const store = useEventConfigurationStore()
const viewData = ref<eventConfiguration | null>()
const route = useRoute()
const id = ref(route.params.id)

const submitDelete = async () => {
  const confirmed = await Swal.fire({
    text: 'Are you sure you want to delete this eventConfiguration?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  })
  if (confirmed.isConfirmed) {
    try {
      await store.deleteItem(viewData.value!.id).then(() => {
        router.push({ name: 'eventConfiguration-list' })
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
      })
    } catch (error) {
      Swal.fire({
        text: 'An error occurred while deleting the eventConfiguration',
        icon: 'error',
        buttonsStyling: false,
        confirmButtonText: 'Ok, got it!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn fw-semobold btn-light-primary'
        }
      })
    }
  }
}
onMounted(async () => {
  viewData.value = await store.fetchItemAsync(id.value)
})
</script>
