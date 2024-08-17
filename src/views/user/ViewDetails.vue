<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_user_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">
                            {{filters.ConvertCamelToTitleName($t('user._title')) }} {{$t('user.details') }}
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
                                    :to="{ name: 'user-edit', params: { id: viewData?.id } }"
                                    class="menu-link align-self-center"
                                    v-if="can('update', 'user')"
                                    >
                                    {{ $t('action.edit') }}
                                </router-link>
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                    v-if="can('delete', 'user')"
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
                                        <!-- email -->
                                        <info-item
                                            :label="$t('user.email')"
                                            :data="viewData.email"
                                            type="email"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- password -->
                                        <info-item
                                            :label="$t('user.password')"
                                            :data="viewData.password"
                                            type="password"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- role -->
                                        <info-item
                                            :label="$t('user.role')"
                                            :data="viewData.role"
                                            type="role"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- provider -->
                                        <info-item
                                            :label="$t('user.provider')"
                                            :data="viewData.provider"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- createdAt -->
                                        <info-item
                                            :label="$t('user.createdAt')"
                                            :data="viewData.createdAt"
                                            type="createdAt"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- modifiedAt -->
                                        <info-item
                                            :label="$t('user.modifiedAt')"
                                            :data="viewData.modifiedAt"
                                            type="modifiedAt"
                                        />
                                    </div>
                                    <!-- Status -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('user.status')"
                                            :data="viewData.status"
                                            type="boolean"
                                        />
                                    </div>
                                    <!-- userBusinessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('user.userBusinessUnit')"
                                            :data="viewData.userBusinessUnit"
                                            type="hasOne"
                                            displayName="code"
                                        />
                                    </div>
                                    <!-- createdBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('user.createdBy')"
                                            :data="viewData.createdBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- modifiedBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('user.modifiedBy')"
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
                :listData="userHandler.dataRef"
                :provider="userProvider_"
                :relationName="'user'"
                @handlePageChange="userHandler.handlePageChange"
                @handleSearch="userHandler.handleSearch"
                @handelExportReport="userHandler.handleExportReport"
                @handleOnPageSizeChange="userHandler.handleOnPageSizeChange"
                @handleFilter="userHandler.handleFilter"
                @handleResetFilter="userHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="businessUnitHandler.dataRef"
                :provider="businessUnitProvider_"
                :relationName="'businessUnit'"
                @handlePageChange="businessUnitHandler.handlePageChange"
                @handleSearch="businessUnitHandler.handleSearch"
                @handelExportReport="businessUnitHandler.handleExportReport"
                @handleOnPageSizeChange="businessUnitHandler.handleOnPageSizeChange"
                @handleFilter="businessUnitHandler.handleFilter"
                @handleResetFilter="businessUnitHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="centerHandler.dataRef"
                :provider="centerProvider_"
                :relationName="'center'"
                @handlePageChange="centerHandler.handlePageChange"
                @handleSearch="centerHandler.handleSearch"
                @handelExportReport="centerHandler.handleExportReport"
                @handleOnPageSizeChange="centerHandler.handleOnPageSizeChange"
                @handleFilter="centerHandler.handleFilter"
                @handleResetFilter="centerHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="teacherHandler.dataRef"
                :provider="teacherProvider_"
                :relationName="'teacher'"
                @handlePageChange="teacherHandler.handlePageChange"
                @handleSearch="teacherHandler.handleSearch"
                @handelExportReport="teacherHandler.handleExportReport"
                @handleOnPageSizeChange="teacherHandler.handleOnPageSizeChange"
                @handleFilter="teacherHandler.handleFilter"
                @handleResetFilter="teacherHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="levelHandler.dataRef"
                :provider="levelProvider_"
                :relationName="'level'"
                @handlePageChange="levelHandler.handlePageChange"
                @handleSearch="levelHandler.handleSearch"
                @handelExportReport="levelHandler.handleExportReport"
                @handleOnPageSizeChange="levelHandler.handleOnPageSizeChange"
                @handleFilter="levelHandler.handleFilter"
                @handleResetFilter="levelHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="videoHandler.dataRef"
                :provider="videoProvider_"
                :relationName="'video'"
                @handlePageChange="videoHandler.handlePageChange"
                @handleSearch="videoHandler.handleSearch"
                @handelExportReport="videoHandler.handleExportReport"
                @handleOnPageSizeChange="videoHandler.handleOnPageSizeChange"
                @handleFilter="videoHandler.handleFilter"
                @handleResetFilter="videoHandler.handleResetFilter"
            />
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="studentHandler.dataRef"
                :provider="studentProvider_"
                :relationName="'student'"
                @handlePageChange="studentHandler.handlePageChange"
                @handleSearch="studentHandler.handleSearch"
                @handelExportReport="studentHandler.handleExportReport"
                @handleOnPageSizeChange="studentHandler.handleOnPageSizeChange"
                @handleFilter="studentHandler.handleFilter"
                @handleResetFilter="studentHandler.handleResetFilter"
            />
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
            <!-- GRID RELATION ONE TO MANY -->
            <OneToManyRelationGrid
                :listData="submissionsHandler.dataRef"
                :provider="submissionsProvider_"
                :relationName="'submissions'"
                @handlePageChange="submissionsHandler.handlePageChange"
                @handleSearch="submissionsHandler.handleSearch"
                @handelExportReport="submissionsHandler.handleExportReport"
                @handleOnPageSizeChange="submissionsHandler.handleOnPageSizeChange"
                @handleFilter="submissionsHandler.handleFilter"
                @handleResetFilter="submissionsHandler.handleResetFilter"
            />

        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import type { user } from '@/providers/user'
import * as  userProvider_  from '@/providers/user'
import {relations} from '@/providers/user'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import OneToManyRelationGrid from "@/components/shared/OneToManyRelationGrid.vue";
import ManyToManyRelationGrid from "@/components/shared/ManyToManyRelationGrid.vue";
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from "@casl/vue";
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'

import * as businessUnitProvider_ from '@/providers/businessUnit'
import { useBusinessUnitStore } from '@/stores/businessUnit'
import * as centerProvider_ from '@/providers/center'
import { useCenterStore } from '@/stores/center'
import * as teacherProvider_ from '@/providers/teacher'
import { useTeacherStore } from '@/stores/teacher'
import * as levelProvider_ from '@/providers/level'
import { useLevelStore } from '@/stores/level'
import * as videoProvider_ from '@/providers/video'
import { useVideoStore } from '@/stores/video'
import * as studentProvider_ from '@/providers/student'
import { useStudentStore } from '@/stores/student'
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
import * as submissionsProvider_ from '@/providers/submissions'
import { useSubmissionsStore } from '@/stores/submissions'

const router = useRouter();
const { can } = useAbility()
const store = useUserStore();
const viewData = ref<user|null>();
const route = useRoute()
const id = ref(route.params.id)

const userHandler = useDefaultRelationHandler(useUserStore(),{filter:`${relations.user.formKey } eq "${id.value}" `})
const businessUnitHandler = useDefaultRelationHandler(useBusinessUnitStore(),{filter:`${relations.businessUnit.formKey } eq "${id.value}" `})
const centerHandler = useDefaultRelationHandler(useCenterStore(),{filter:`${relations.center.formKey } eq "${id.value}" `})
const teacherHandler = useDefaultRelationHandler(useTeacherStore(),{filter:`${relations.teacher.formKey } eq "${id.value}" `})
const levelHandler = useDefaultRelationHandler(useLevelStore(),{filter:`${relations.level.formKey } eq "${id.value}" `})
const videoHandler = useDefaultRelationHandler(useVideoStore(),{filter:`${relations.video.formKey } eq "${id.value}" `})
const studentHandler = useDefaultRelationHandler(useStudentStore(),{filter:`${relations.student.formKey } eq "${id.value}" `})
const resultHandler = useDefaultRelationHandler(useResultStore(),{filter:`${relations.result.formKey } eq "${id.value}" `})
const homeworkHandler = useDefaultRelationHandler(useHomeworkStore(),{filter:`${relations.homework.formKey } eq "${id.value}" `})
const attendanceHandler = useDefaultRelationHandler(useAttendanceStore(),{filter:`${relations.attendance.formKey } eq "${id.value}" `})
const subscriptionHandler = useDefaultRelationHandler(useSubscriptionStore(),{filter:`${relations.subscription.formKey } eq "${id.value}" `})
const examHandler = useDefaultRelationHandler(useExamStore(),{filter:`${relations.exam.formKey } eq "${id.value}" `})
const submissionsHandler = useDefaultRelationHandler(useSubmissionsStore(),{filter:`${relations.submissions.formKey } eq "${id.value}" `})


const submitDelete = async () => {
    const confirmed = await Swal.fire({
        text: 'Are you sure you want to delete this user?',
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
                    router.push({ name: 'user-list' });
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
                text: 'An error occurred while deleting the user',
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
