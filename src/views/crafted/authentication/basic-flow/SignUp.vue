<template>
    <!--begin::Wrapper-->
    <div class="w-lg-500px p-10">
        <!--begin::Form-->
        <div class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework">
            <!--begin::Heading-->
            <div class="mb-10 text-center">
                <!-- <img alt="Logo" :src="getAssetPath('media/logos/logo.svg')" class="h-70px" /> -->

                <!--begin::Title-->
                <h1 class="text-gray-900 mb-3">
                    {{ $t('auth.create_account') }}
                </h1>
                <!--end::Title-->

                <!--begin::Link-->
                <div class="text-gray-500 fw-semibold fs-4">
                    {{ $t('auth.welcome') }}
                    <div>
                        <p>{{ $t('auth.already_have_account') }}?</p>
                        <router-link to="/sign-in" class="link-primary fw-bold">
                            &nbsp;{{ $t('auth.singin_instead') }}
                        </router-link>
                    </div>
                </div>
                <!--end::Link-->
            </div>
            <!--end::Heading-->
            <DynamicForm
                :formFields="formFields"
                :formData="formData"
                @submit="handleSubmit"
                mode="create"
            ></DynamicForm>

            <!--end::Actions-->
        </div>
        <!--end::Form-->
    </div>
    <!--end::Wrapper-->
</template>

<script lang="ts" setup>
  import { getAssetPath } from "@/core/helpers/assets";
  import * as Yup from "yup";
  // import { useAuthStore, type User } from "@/stores/auth";
  import { useRouter } from "vue-router";
  // import { PasswordMeterComponent } from "@/assets/ts/components";
  // import Swal from "sweetalert2/dist/sweetalert2.js";
import DynamicForm from "@/components/Form/DynamicForm.vue";import { formData, formFields } from "@/providers/user";
import { useUserStore } from '@/stores/user';

const userEntity = useUserStore();

import ApiService from "@/core/services/ApiService";
import Swal from "sweetalert2/dist/sweetalert2.js";
import { useAuthStore } from '@/stores/auth';


const store = useAuthStore();
const router = useRouter();

const handleSubmit = async (data) => {
  const test = '';
  store.logout();
  try {
    const userData = await store.register(data);
    const error = Object.values(store.errors);
    if (error.length === 0) {
      Swal.fire({
        text: 'You have successfully sign up!',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Ok, got it!',
        heightAuto: false,
        customClass: {
          confirmButton: 'btn fw-semobold btn-light-primary',
        },
      }).then(async () => {
        // Go to page after successful login
        localStorage.clear();
        router.push({ name: 'sign-in' });
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
  //  weekdayssOnSchedulesEntity.create(data);
};
</script>
