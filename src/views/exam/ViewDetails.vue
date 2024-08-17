<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_exam_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">
                            {{filters.ConvertCamelToTitleName($t('exam._title')) }} {{$t('exam.details') }}
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
                                    :to="{ name: 'exam-edit', params: { id: viewData?.id } }"
                                    class="menu-link align-self-center"
                                    v-if="can('update', 'exam')"
                                    >
                                    {{ $t('action.edit') }}
                                </router-link>
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                    v-if="can('delete', 'exam')"
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
                                            :label="$t('exam.name')"
                                            :data="viewData.name"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- time -->
                                        <info-item
                                            :label="$t('exam.time')"
                                            :data="viewData.time"
                                            type="time"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- numberOfQuestions -->
                                        <info-item
                                            :label="$t('exam.numberOfQuestions')"
                                            :data="viewData.numberOfQuestions"
                                            type="int"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- image -->
                                        <info-item
                                            :label="$t('exam.image')"
                                            :data="viewData.image"
                                            type="image"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- createdAt -->
                                        <info-item
                                            :label="$t('exam.createdAt')"
                                            :data="viewData.createdAt"
                                            type="createdAt"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- modifiedAt -->
                                        <info-item
                                            :label="$t('exam.modifiedAt')"
                                            :data="viewData.modifiedAt"
                                            type="modifiedAt"
                                        />
                                    </div>
                                    <!-- examLevel -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.examLevel')"
                                            :data="viewData.examLevel"
                                            type="hasOne"
                                            displayName="name"
                                        />
                                    </div>
                                    <!-- examVideo -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.examVideo')"
                                            :data="viewData.examVideo"
                                            type="hasOne"
                                            displayName="title"
                                        />
                                    </div>
                                    <!-- examTeacher -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.examTeacher')"
                                            :data="viewData.examTeacher"
                                            type="hasOne"
                                            displayName="name"
                                        />
                                    </div>
                                    <!-- owner -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.owner')"
                                            :data="viewData.owner"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- businessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.businessUnit')"
                                            :data="viewData.businessUnit"
                                            type="hasOne"
                                            displayName="code"
                                        />
                                    </div>
                                    <!-- createdBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.createdBy')"
                                            :data="viewData.createdBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- modifiedBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('exam.modifiedBy')"
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

            <!-- GRID RELATION Many TO MANY -->
            <ManyToManyRelationGrid
                :relationName="'exam'"
                :listData="studentManyToManyHandler.dataRef"
                :listModalData="studentManyToManyHandler.dataRefModal"
                :provider="studentProvider_"
                :relation="studentRelation"
                @handlePageChange="studentManyToManyHandler.handlePageChange"
                @handleSearch="studentManyToManyHandler.handleSearch"
                @handleSearchModal="studentManyToManyHandler.handleSearchModal"
                @handelExportReport="studentManyToManyHandler.handleExportReport"
                @handleOnPageSizeChange="studentManyToManyHandler.handleOnPageSizeChange"
                @handelOpenModal="studentManyToManyHandler.handelOpenModal"
                @handleAssign="studentManyToManyHandler.assignItem"
                @handleDetach="studentManyToManyHandler.detachItem"
                @handleFilter="studentManyToManyHandler.handleFilter"
                @handleFilterModal="studentManyToManyHandler.handleFilterModal"
                @handleResetFilter="studentManyToManyHandler.handleResetFilter"
                @handleResetFilterModal="studentManyToManyHandler.handleResetFilterModal"
            />
        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useExamStore } from '@/stores/exam';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import type { exam } from '@/providers/exam'
import * as  examProvider_  from '@/providers/exam'
import {relations} from '@/providers/exam'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import OneToManyRelationGrid from "@/components/shared/OneToManyRelationGrid.vue";
import ManyToManyRelationGrid from "@/components/shared/ManyToManyRelationGrid.vue";
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from "@casl/vue";
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'

import * as submissionsProvider_ from '@/providers/submissions'
import { useSubmissionsStore } from '@/stores/submissions'
import * as studentProvider_ from '@/providers/student'
import { useStudentStore } from '@/stores/student'

const router = useRouter();
const { can } = useAbility()
const store = useExamStore();
const viewData = ref<exam|null>();
const route = useRoute()
const id = ref(route.params.id)

const submissionsHandler = useDefaultRelationHandler(useSubmissionsStore(),{filter:`${relations.submissions.formKey } eq ${id.value}  `})

const studentRelation=examProvider_.relations.studentRelation
const studentManyToManyHandler = useManyToManyHandler(useStudentStore(),{ filter: `${ studentRelation.relationName}.some.${ studentRelation.relationKeyFilter} eq ${id.value}  ` })

const submitDelete = async () => {
    const confirmed = await Swal.fire({
        text: 'Are you sure you want to delete this exam?',
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
                    router.push({ name: 'exam-list' });
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
                text: 'An error occurred while deleting the exam',
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
