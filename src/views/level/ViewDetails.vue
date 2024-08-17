<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_level_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">
                            {{filters.ConvertCamelToTitleName($t('level._title')) }} {{$t('level.details') }}
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
                                    :to="{ name: 'level-edit', params: { id: viewData?.id } }"
                                    class="menu-link align-self-center"
                                    v-if="can('update', 'level')"
                                    >
                                    {{ $t('action.edit') }}
                                </router-link>
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                    v-if="can('delete', 'level')"
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
                                            :label="$t('level.name')"
                                            :data="viewData.name"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- createdAt -->
                                        <info-item
                                            :label="$t('level.createdAt')"
                                            :data="viewData.createdAt"
                                            type="createdAt"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- modifiedAt -->
                                        <info-item
                                            :label="$t('level.modifiedAt')"
                                            :data="viewData.modifiedAt"
                                            type="modifiedAt"
                                        />
                                    </div>
                                    <!-- owner -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('level.owner')"
                                            :data="viewData.owner"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- businessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('level.businessUnit')"
                                            :data="viewData.businessUnit"
                                            type="hasOne"
                                            displayName="code"
                                        />
                                    </div>
                                    <!-- createdBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('level.createdBy')"
                                            :data="viewData.createdBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- modifiedBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('level.modifiedBy')"
                                            :data="viewData.modifiedBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--end::Card body-->
            </div>
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="attendanceHandler.dataRef"
                :provider="attendanceProvider_"
                :relationName="'attendance'"
                @handlePageChange="attendanceHandler.handlePageChange"
                @handleSearch="attendanceHandler.handleSearch"
                @handelExportReport="attendanceHandler.handleExportReport"
                @handleOnPageSizeChange="attendanceHandler.handleOnPageSizeChange"
                @handleFilter="attendanceHandler.handleFilter"
                @handleResetFilter="attendanceHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="subscriptionHandler.dataRef"
                :provider="subscriptionProvider_"
                :relationName="'subscription'"
                @handlePageChange="subscriptionHandler.handlePageChange"
                @handleSearch="subscriptionHandler.handleSearch"
                @handelExportReport="subscriptionHandler.handleExportReport"
                @handleOnPageSizeChange="subscriptionHandler.handleOnPageSizeChange"
                @handleFilter="subscriptionHandler.handleFilter"
                @handleResetFilter="subscriptionHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="examHandler.dataRef"
                :provider="examProvider_"
                :relationName="'exam'"
                @handlePageChange="examHandler.handlePageChange"
                @handleSearch="examHandler.handleSearch"
                @handelExportReport="examHandler.handleExportReport"
                @handleOnPageSizeChange="examHandler.handleOnPageSizeChange"
                @handleFilter="examHandler.handleFilter"
                @handleResetFilter="examHandler.handleResetFilter"
            />

            <!-- GRID RELATION Many TO MANY -->
            <ManyToManyRelationGrid
                :relationName="'level'"
                :listData="teacherManyToManyHandler.dataRef"
                :listModalData="teacherManyToManyHandler.dataRefModal"
                :provider="teacherProvider_"
                :relation="teacherRelation"
                @handlePageChange="teacherManyToManyHandler.handlePageChange"
                @handleSearch="teacherManyToManyHandler.handleSearch"
                @handleSearchModal="teacherManyToManyHandler.handleSearchModal"
                @handelExportReport="teacherManyToManyHandler.handleExportReport"
                @handleOnPageSizeChange="teacherManyToManyHandler.handleOnPageSizeChange"
                @handelOpenModal="teacherManyToManyHandler.handelOpenModal"
                @handleAssign="teacherManyToManyHandler.assignItem"
                @handleDetach="teacherManyToManyHandler.detachItem"
                @handleFilter="teacherManyToManyHandler.handleFilter"
                @handleFilterModal="teacherManyToManyHandler.handleFilterModal"
                @handleResetFilter="teacherManyToManyHandler.handleResetFilter"
                @handleResetFilterModal="teacherManyToManyHandler.handleResetFilterModal"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useLevelStore } from '@/stores/level';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import type { level } from '@/providers/level'
import * as  levelProvider_  from '@/providers/level'
import {relations} from '@/providers/level'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import OneToManyRelationGrid from "@/components/shared/OneToManyRelationGrid.vue";
import ManyToManyRelationGrid from "@/components/shared/ManyToManyRelationGrid.vue";
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from "@casl/vue";
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'

import * as attendanceProvider_ from '@/providers/attendance'
import { useAttendanceStore } from '@/stores/attendance'
import * as subscriptionProvider_ from '@/providers/subscription'
import { useSubscriptionStore } from '@/stores/subscription'
import * as examProvider_ from '@/providers/exam'
import { useExamStore } from '@/stores/exam'
import * as teacherProvider_ from '@/providers/teacher'
import { useTeacherStore } from '@/stores/teacher'

const router = useRouter();
const { can } = useAbility()
const store = useLevelStore();
const viewData = ref<level|null>();
const route = useRoute()
const id = ref(route.params.id)

const attendanceHandler = useDefaultRelationHandler(useAttendanceStore(),{filter:`${relations.attendance.formKey } eq ${id.value}  `})
const subscriptionHandler = useDefaultRelationHandler(useSubscriptionStore(),{filter:`${relations.subscription.formKey } eq ${id.value}  `})
const examHandler = useDefaultRelationHandler(useExamStore(),{filter:`${relations.exam.formKey } eq ${id.value}  `})

const teacherRelation=levelProvider_.relations.teacherRelation
const teacherManyToManyHandler = useManyToManyHandler(useTeacherStore(),{ filter: `${ teacherRelation.relationName}.some.${ teacherRelation.relationKeyFilter} eq ${id.value}  ` })

const submitDelete = async () => {
    const confirmed = await Swal.fire({
        text: 'Are you sure you want to delete this level?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel',
    });
    if (confirmed.isConfirmed) {
        try {
            await store
                .deleteItem(viewData.value!.id)
                .then(() => {
                    router.push({ name: 'level-list' });
                    Swal.fire({
                        text: 'Deleted Successfully!',
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonText: 'Ok, got it!',
                        heightAuto: false,
                        customClass: {
                            confirmButton:
                                'btn fw-semobold btn-light-primary',
                        },
                    });
                });
        } catch (error) {
            Swal.fire({
                text: 'An error occurred while deleting the level',
                icon: 'error',
                buttonsStyling: false,
                confirmButtonText: 'Ok, got it!',
                heightAuto: false,
                customClass: {
                    confirmButton: 'btn fw-semobold btn-light-primary',
                },
            });
        }
    }
};
onMounted(async () => {
    viewData.value = await store.fetchItemAsync(id.value)
});
</script>
