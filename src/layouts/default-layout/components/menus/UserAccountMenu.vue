<template>
    <!--begin::Menu-->
    <div
        class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold py-4 fs-6 w-275px"
        data-kt-menu="true"
    >
        <!--begin::Menu item-->
        <div class="menu-item px-3">
            <div class="menu-content d-flex align-items-center px-3">
                <!--begin::Avatar-->
                <div class="symbol symbol-50px me-5" v-if="user.image != null">
                <img alt="Logo" :src="user.image.url" />
                </div>
                <div class="symbol symbol-50px me-5" v-else>
                <img alt="Logo" :src="getAssetPath('media/avatars/user.png')" />
                </div>
                <!--end::Avatar-->

                <!--begin::Username-->
                <div class="d-flex flex-column" v-if="user">
                    <div class="fw-bold d-flex align-items-center fs-5">
                        <span v-if="user.username">{{ user.username }}</span>
                        <span
                            class="badge badge-light-success fw-bold fs-8 px-2 py-1"
                            >{{ user.role }}</span
                        >
                    </div>
                    <a
                        href="#"
                        class="fw-semibold text-muted text-hover-primary fs-7"
                        >{{ user.email }}</a
                    >
                </div>
                <!--end::Username-->
            </div>
        </div>
        <!--end::Menu item-->
        <!--begin::Menu separator-->
        <div class="separator my-2"></div>
        <!--end::Menu separator-->

        <!--begin::Menu item-->
        <div
            class="menu-item px-5"
            data-kt-menu-trigger="hover"
            data-kt-menu-placement="left-start"
            data-kt-menu-flip="center, top"
        >
            <div class="menu-link px-5">
                <span class="menu-title position-relative">
                    {{ $t('langs.language') }}
                    <span
                        class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
                    >
                        {{ currentLangugeLocale.name }}
                    </span>
                </span>
            </div>

            <!--begin::Menu sub-->
            <div class="menu-sub menu-sub-dropdown w-175px py-4">
                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <a
                        @click="setLang('en')"
                        href="#"
                        class="menu-link d-flex px-5"
                        :class="{ active: currentLanguage === 'en' }"
                    >
                        English
                    </a>
                </div>
                <!--end::Menu item-->

                <!--begin::Menu item-->
                <div class="menu-item px-3">
                    <a
                        @click="setLang('ar')"
                        href="#"
                        class="menu-link d-flex px-5"
                        :class="{ active: currentLanguage === 'ar' }"
                    >
                        العربية
                    </a>
                </div>
                <!--end::Menu item-->
            </div>
            <!--end::Menu sub-->
        </div>
        <!--end::Menu item-->

        <!--begin::Menu separator-->
        <div class="separator my-2"></div>
        <!--end::Menu separator-->

        <!--begin::Menu item-->
        <div class="menu-item px-5">
            <a @click="signOut()" class="menu-link px-5"> Sign Out </a>
        </div>
        <!--end::Menu item-->
    </div>
    <!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from '@/core/helpers/assets';
import { computed, defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
export default defineComponent({
    name: 'kt-user-menu',
    components: {},
    setup() {
        const router = useRouter();
        const i18n = useI18n();
        const store = useAuthStore();
        const { user } = storeToRefs(store);
        i18n.locale.value = localStorage.getItem('lang')
            ? (localStorage.getItem('lang') as string)
            : 'en';

        const countries = {
            en: {
                flag: '',
                name: 'English',
            },
            ar: {
                flag: '',
                name: 'Arabic',
            },
        };

        const signOut = () => {
            store.logout();
            router.push({ name: 'sign-in' });
        };

        const setLang = (lang: string) => {
            localStorage.setItem('lang', lang);
            i18n.locale.value = lang;
            location.reload();
        };

        const currentLanguage = computed(() => {
            return i18n.locale.value;
        });

        const currentLangugeLocale = computed(() => {
            return countries[i18n.locale.value as keyof typeof countries];
        });

        return {
            signOut,
            setLang,
            currentLanguage,
            currentLangugeLocale,
            countries,
            getAssetPath,
            user,
        };
    },
});
</script>
