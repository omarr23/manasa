<template>
    <section>
        <div
            id="kt_app_content_container"
            class="app-container container-fluid"
        >
            <div
                class="card mb-5 mb-xl-10"
                id="kt_homework_details_view"
            >
                <div class="card-header cursor-pointer">
                    <!--begin::Card title-->
                    <div class="card-title m-0">
                        <h3 class="fw-bold m-0">
                            {{filters.ConvertCamelToTitleName($t('homework._title')) }} {{$t('homework.details') }}
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
                                    :to="{ name: 'homework-edit', params: { id: viewData?.id } }"
                                    class="menu-link align-self-center"
                                    v-if="can('update', 'homework')"
                                    >
                                    {{ $t('action.edit') }}
                                </router-link>
                            </div>
                            <div class="menu-item px-5">
                                <a
                                    @click="submitDelete()"
                                    href="#"
                                    class="menu-link align-self-center text-danger"
                                    v-if="can('delete', 'homework')"
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
                                            :label="$t('homework.title')"
                                            :data="viewData.title"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- description -->
                                        <info-item
                                            :label="$t('homework.description')"
                                            :data="viewData.description"
                                            type="string"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- createdAt -->
                                        <info-item
                                            :label="$t('homework.createdAt')"
                                            :data="viewData.createdAt"
                                            type="createdAt"
                                        />
                                    </div>
                                    <div class="mb-3 col-lg-6">
                                        <!-- modifiedAt -->
                                        <info-item
                                            :label="$t('homework.modifiedAt')"
                                            :data="viewData.modifiedAt"
                                            type="modifiedAt"
                                        />
                                    </div>
                                    <!-- owner -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.owner')"
                                            :data="viewData.owner"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- businessUnit -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.businessUnit')"
                                            :data="viewData.businessUnit"
                                            type="hasOne"
                                            displayName="code"
                                        />
                                    </div>
                                    <!-- createdBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.createdBy')"
                                            :data="viewData.createdBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- modifiedBy -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.modifiedBy')"
                                            :data="viewData.modifiedBy"
                                            type="hasOne"
                                            displayName="email"
                                        />
                                    </div>
                                    <!-- homeworkTeacher -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.homeworkTeacher')"
                                            :data="viewData.homeworkTeacher"
                                            type="hasOne"
                                            displayName="name"
                                        />
                                    </div>
                                    <!-- homeworkVideo -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.homeworkVideo')"
                                            :data="viewData.homeworkVideo"
                                            type="hasOne"
                                            displayName="title"
                                        />
                                    </div>
                                    <!-- homeworkStudent -->
                                    <div class="mb-3 col-lg-6">
                                        <info-item
                                            :label="$t('homework.homeworkStudent')"
                                            :data="viewData.homeworkStudent"
                                            type="hasOne"
                                            displayName="username"
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
import { ref, onMounted } from 'vue';
import { useHomeworkStore } from '@/stores/homework';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router'
import type { homework } from '@/providers/homework'
import * as  homeworkProvider_  from '@/providers/homework'
import {relations} from '@/providers/homework'
import Swal from 'sweetalert2/dist/sweetalert2.js';
import OneToManyRelationGrid from "@/components/shared/OneToManyRelationGrid.vue";
import ManyToManyRelationGrid from "@/components/shared/ManyToManyRelationGrid.vue";
import InfoItem from '@/components/shared/InfoItem.vue'
import filters from '@/core/helpers/filters.ts'
import { useAbility } from "@casl/vue";
import { useDefaultRelationHandler } from '@/composables/defaultRelationHandler'
import { useManyToManyHandler } from '@/composables/ManyToManyRelationHandler'


const router = useRouter();
const { can } = useAbility()
const store = useHomeworkStore();
const viewData = ref<homework|null>();
const route = useRoute()
const id = ref(route.params.id)



const submitDelete = async () => {
    const confirmed = await Swal.fire({
        text: 'Are you sure you want to delete this homework?',
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
                    router.push({ name: 'homework-list' });
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
                text: 'An error occurred while deleting the homework',
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
