<template>
    <!--begin::Footer-->
    <div v-if="footerDisplay" id="kt_app_footer" class="app-footer">
        <!--begin::Footer container-->
        <div
            class="app-container d-flex flex-column flex-md-row flex-center flex-md-stack py-3"
            :class="{
                'container-fluid': footerWidthFluid,
                'container-xxl': !footerWidthFluid,
            }"
        >
            <!--begin::Copyright-->
            <div class="text-dark order-2 order-md-1">
                <span class="text-muted fw-semibold me-1"
                    >© {{ new Date().getFullYear() }}</span
                >
                <a
                    href="https://swayjs.com"
                    target="_blank"
                    class="text-gray-800 text-hover-primary"
                >
                    Sway
                </a>
            </div>
            <!--end::Copyright-->
        </div>
        <!--end::Footer container-->
    </div>
    <!--end::Footer-->
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
    footerDisplay,
    footerWidthFluid,
} from '@/layouts/default-layout/config/helper';

export default defineComponent({
    name: 'theme-footer',
    components: {},
    setup() {
        return {
            footerWidthFluid,
            footerDisplay,
        };
    },
});
</script>
