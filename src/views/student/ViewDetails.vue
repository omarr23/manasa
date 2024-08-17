<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_student_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">
                            {{filters.ConvertCamelToTitleName($t('student._title')) }} {{$t('student.details') }}
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
                                    :to="{ name: 'student-edit', params: { id: viewData?.id } }"
                                    class="menu-link align-self-center"
                                    v-if="can('update', 'student')"
                                    >
                                    {{ $t('action.edit') }}
                                </router-link>
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                    v-if="can('delete', 'student')"
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
                                        <!-- username -->
                                        <info-item
                                            :label="$t('student.username')"
                                            :data="viewData.username"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- email -->
                                        <info-item
                                            :label="$t('student.email')"
                                            :data="viewData.email"
                                            type="email"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- image -->
                                        <info-item
                                            :label="$t('student.image')"
                                            :data="viewData.image"
                                            type="image"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- blocked -->
                                        <info-item
                                            :label="$t('student.blocked')"
                                            :data="viewData.blocked"
                                            type="boolean"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- phone -->
                                        <info-item
                                            :label="$t('student.phone')"
                                            :data="viewData.phone"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- createdAt -->
                                        <info-item
                                            :label="$t('student.createdAt')"
                                            :data="viewData.createdAt"
                                            type="createdAt"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- modifiedAt -->
                                        <info-item
                                            :label="$t('student.modifiedAt')"
                                            :data="viewData.modifiedAt"
                                            type="modifiedAt"
                                        />
                                    </div>
                                    <!-- Status -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('student.status')"
                                            :data="viewData.status"
                                            type="boolean"
                                        />
                                    </div>
                                    <!-- owner -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('student.owner')"
                                            :data="viewData.owner"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- businessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('student.businessUnit')"
                                            :data="viewData.businessUnit"
                                            type="hasOne"
                                            displayName="code"
                                        />
                                    </div>
                                    <!-- createdBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('student.createdBy')"
                                            :data="viewData.createdBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- modifiedBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('student.modifiedBy')"
                                            :data="viewData.modifiedBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- studentuser -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('student.studentuser')"
                                            :data="viewData.studentuser"
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
                :listData="resultHandler.dataRef"
                :provider="resultProvider_"
                :relationName="'result'"
                @handlePageChange="resultHandler.handlePageChange"
                @handleSearch="resultHandler.handleSearch"
                @handelExportReport="resultHandler.handleExportReport"
                @handleOnPageSizeChange="resultHandler.handleOnPageSizeChange"
                @handleFilter="resultHandler.handleFilter"
                @handleResetFilter="resultHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="homeworkHandler.dataRef"
                :provider="homeworkProvider_"
                :relationName="'homework'"
                @handlePageChange="homeworkHandler.handlePageChange"
                @handleSearch="homeworkHandler.handleSearch"
                @handelExportReport="homeworkHandler.handleExportReport"
                @handleOnPageSizeChange="homeworkHandler.handleOnPageSizeChange"
                @handleFilter="homeworkHandler.handleFilter"
                @handleResetFilter="homeworkHandler.handleResetFilter"
            />
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

            <!-- GRID RELATION Many TO MANY -->
            <ManyToManyRelationGrid
                :relationName="'student'"
                :listData="examManyToManyHandler.dataRef"
                :listModalData="examManyToManyHandler.dataRefModal"
                :provider="examProvider_"
                :relation="examRelation"
                @handlePageChange="examManyToManyHandler.handlePageChange"
                @handleSearch="examManyToManyHandler.handleSearch"
                @handleSearchModal="examManyToManyHandler.handleSearchModal"
                @handelExportReport="examManyToManyHandler.handleExportReport"
                @handleOnPageSizeChange="examManyToManyHandler.handleOnPageSizeChange"
                @handelOpenModal="examManyToManyHandler.handelOpenModal"
                @handleAssign="examManyToManyHandler.assignItem"
                @handleDetach="examManyToManyHandler.detachItem"
                @handleFilter="examManyToManyHandler.handleFilter"
                @handleFilterModal="examManyToManyHandler.handleFilterModal"
                @handleResetFilter="examManyToManyHandler.handleResetFilter"
                @handleResetFilterModal="examManyToManyHandler.handleResetFilterModal"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import type { student } from '@/providers/student'
import * as  studentProvider_  from '@/providers/student'
import {relations} from '@/providers/student'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import OneToManyRelationGrid from "@/components/shared/OneToManyRelationGrid.vue";
import ManyToManyRelationGrid from "@/components/shared/ManyToManyRelationGrid.vue";
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from "@casl/vue";
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'

import * as resultProvider_ from '@/providers/result'
import { useResultStore } from '@/stores/result'
import * as homeworkProvider_ from '@/providers/homework'
import { useHomeworkStore } from '@/stores/homework'
import * as attendanceProvider_ from '@/providers/attendance'
import { useAttendanceStore } from '@/stores/attendance'
import * as subscriptionProvider_ from '@/providers/subscription'
import { useSubscriptionStore } from '@/stores/subscription'
import * as examProvider_ from '@/providers/exam'
import { useExamStore } from '@/stores/exam'

const router = useRouter();
const { can } = useAbility()
const store = useStudentStore();
const viewData = ref<student|null>();
const route = useRoute()
const id = ref(route.params.id)

const resultHandler = useDefaultRelationHandler(useResultStore(),{filter:`${relations.result.formKey } eq ${id.value}  `})
const homeworkHandler = useDefaultRelationHandler(useHomeworkStore(),{filter:`${relations.homework.formKey } eq ${id.value}  `})
const attendanceHandler = useDefaultRelationHandler(useAttendanceStore(),{filter:`${relations.attendance.formKey } eq ${id.value}  `})
const subscriptionHandler = useDefaultRelationHandler(useSubscriptionStore(),{filter:`${relations.subscription.formKey } eq ${id.value}  `})

const examRelation=studentProvider_.relations.examRelation
const examManyToManyHandler = useManyToManyHandler(useExamStore(),{ filter: `${ examRelation.relationName}.some.${ examRelation.relationKeyFilter} eq ${id.value}  ` })

const submitDelete = async () => {
    const confirmed = await Swal.fire({
        text: 'Are you sure you want to delete this student?',
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
                    router.push({ name: 'student-list' });
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
                text: 'An error occurred while deleting the student',
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
