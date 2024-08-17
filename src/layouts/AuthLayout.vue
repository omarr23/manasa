<template>
    <!--begin::Authentication Layout -->
    <div class="d-flex flex-column flex-lg-row flex-column-fluid">
        <!--begin::Body-->
        <div
            class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
        >
            <!--begin::Form-->
            <div class="d-flex flex-center flex-column flex-lg-row-fluid">
                <!--begin::Wrapper-->
                <div class="w-lg-500px p-10">
                    <router-view></router-view>
                </div>
                <!--end::Wrapper-->
            </div>
            <!--end::Form-->
        </div>
        <!--end::Body-->

        <!--begin::Aside-->
        <div
            class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
            :style="`background-image: url('${getAssetPath('media/misc/auth-bg.png')}')`"
        >
            <!--begin::Content-->
            <div
                class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
            >
                <Vue3Lottie :animationData="AuthJSON" width="60%" />
            </div>
            <!--end::Content-->
        </div>
        <!--end::Aside-->
    </div>
    <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { getAssetPath } from '@/core/helpers/assets';
import { defineComponent, onMounted } from 'vue';
import LayoutService from '@/core/services/LayoutService';
import { useBodyStore } from '@/stores/body';
import AuthJSON from '@/assets/lotties/auth.json';
import { Vue3Lottie } from 'vue3-lottie';

export default defineComponent({
    name: 'auth-layout',
    components: { Vue3Lottie },
    data() {
        return {
            AuthJSON,
        };
    },
    setup() {
        const store = useBodyStore();

        onMounted(() => {
            LayoutService.emptyElementClassesAndAttributes(document.body);

            store.addBodyClassname('app-blank');
            store.addBodyClassname('bg-body');
        });

        return {
            getAssetPath,
        };
    },
});
</script>
