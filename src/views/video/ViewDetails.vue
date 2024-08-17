<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_video_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">
                            {{filters.ConvertCamelToTitleName($t('video._title')) }} {{$t('video.details') }}
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
                                    :to="{ name: 'video-edit', params: { id: viewData?.id } }"
                                    class="menu-link align-self-center"
                                    v-if="can('update', 'video')"
                                    >
                                    {{ $t('action.edit') }}
                                </router-link>
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                    v-if="can('delete', 'video')"
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
                                        <!-- title -->
                                        <info-item
                                            :label="$t('video.title')"
                                            :data="viewData.title"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- urlServer1 -->
                                        <info-item
                                            :label="$t('video.urlServer1')"
                                            :data="viewData.urlServer1"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- urlServer2 -->
                                        <info-item
                                            :label="$t('video.urlServer2')"
                                            :data="viewData.urlServer2"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- urlServer3 -->
                                        <info-item
                                            :label="$t('video.urlServer3')"
                                            :data="viewData.urlServer3"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- thumbnail -->
                                        <info-item
                                            :label="$t('video.thumbnail')"
                                            :data="viewData.thumbnail"
                                            type="image"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- details -->
                                        <info-item
                                            :label="$t('video.details')"
                                            :data="viewData.details"
                                            type="text"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- activationcode -->
                                        <info-item
                                            :label="$t('video.activationcode')"
                                            :data="viewData.activationcode"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- createdAt -->
                                        <info-item
                                            :label="$t('video.createdAt')"
                                            :data="viewData.createdAt"
                                            type="createdAt"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- modifiedAt -->
                                        <info-item
                                            :label="$t('video.modifiedAt')"
                                            :data="viewData.modifiedAt"
                                            type="modifiedAt"
                                        />
                                    </div>
                                    <!-- owner -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('video.owner')"
                                            :data="viewData.owner"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- businessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('video.businessUnit')"
                                            :data="viewData.businessUnit"
                                            type="hasOne"
                                            displayName="code"
                                        />
                                    </div>
                                    <!-- createdBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('video.createdBy')"
                                            :data="viewData.createdBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- modifiedBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('video.modifiedBy')"
                                            :data="viewData.modifiedBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- videoTeacher -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('video.videoTeacher')"
                                            :data="viewData.videoTeacher"
                                            type="hasOne"
                                            displayName="name"
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

        </div>
    </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useVideoStore } from '@/stores/video';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import type { video } from '@/providers/video'
import * as  videoProvider_  from '@/providers/video'
import {relations} from '@/providers/video'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import OneToManyRelationGrid from "@/components/shared/OneToManyRelationGrid.vue";
import ManyToManyRelationGrid from "@/components/shared/ManyToManyRelationGrid.vue";
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from "@casl/vue";
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'

import * as examProvider_ from '@/providers/exam'
import { useExamStore } from '@/stores/exam'
import * as attendanceProvider_ from '@/providers/attendance'
import { useAttendanceStore } from '@/stores/attendance'

const router = useRouter();
const { can } = useAbility()
const store = useVideoStore();
const viewData = ref<video|null>();
const route = useRoute()
const id = ref(route.params.id)

const examHandler = useDefaultRelationHandler(useExamStore(),{filter:`${relations.exam.formKey } eq ${id.value}  `})
const attendanceHandler = useDefaultRelationHandler(useAttendanceStore(),{filter:`${relations.attendance.formKey } eq ${id.value}  `})


const submitDelete = async () => {
    const confirmed = await Swal.fire({
        text: 'Are you sure you want to delete this video?',
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
                    router.push({ name: 'video-list' });
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
                text: 'An error occurred while deleting the video',
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
