<template>
    <div class="w-lg-500px p-10">
      <VForm
        class="form w-100"
        @submit="onSubmitLogin"
        :validation-schema="login"
        :initial-values="{ email: 'admin@admin.com', password: '@Password1234' }"
      >
        <div class="text-center mb-10">
          <h1 class="text-gray-900 mb-3">Sign In</h1>
          <div class="text-gray-500 fw-semibold fs-4">
            New Here?
            <router-link to="/sign-up" class="link-primary fw-bold">
              Create an Account
            </router-link>
          </div>
        </div>
        <div class="fv-row mb-10">
          <label class="form-label fs-6 fw-bold text-gray-900">Email</label>
          <Field
            tabindex="1"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="email"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="email" />
            </div>
          </div>
        </div>
        <div class="fv-row mb-10">
          <div class="d-flex flex-stack mb-2">
            <label class="form-label fw-bold text-gray-900 fs-6 mb-0">
              Password
            </label>
          </div>
          <Field
            tabindex="2"
            class="form-control form-control-lg form-control-solid"
            type="password"
            name="password"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container d-flex flex-stack">
            <div class="fv-help-block">
              <ErrorMessage name="password" />
            </div>
            <router-link
              to="/password-reset"
              class="link-primary fs-6 fw-bold mt-2"
            >
              Forgot Password ?
            </router-link>
          </div>
        </div>
  
        <div class="text-center">
          <button
            ref="submitButton"
            class="btn btn-lg btn-primary w-100 mb-5"
            type="submit"
          >
            <span class="indicator-label"> Continue </span>
            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
      </VForm>
    </div>
  </template>
  
  <script setup lang="ts">
  import { getAssetPath } from "@/core/helpers/assets";
  import { defineComponent, ref } from "vue";
  import { ErrorMessage, Field, Form as VForm } from "vee-validate";
  import { useAuthStore, type User } from "@/stores/auth";
  import { useRouter } from "vue-router";
  import { defaultRedirect } from "@/core/plugins/acl/routeProtection.ts";
  import MainMenuConfig from '@/layouts/default-layout/config/MainMenuConfig'
  import Swal from "sweetalert2/dist/sweetalert2.js";
  import * as Yup from "yup";
  import { useAbility } from "@casl/vue";
  import { useUserRoleStore } from '@/stores/userRole'
  import { useBusinessUnitStore } from '@/stores/businessUnit'

  const store = useAuthStore();
  const router = useRouter();
  const userRoleEntity = useUserRoleStore()
  const userBussinessUnitEntity = useBusinessUnitStore()
  const submitButton = ref<HTMLButtonElement | null>(null);
  const { can } = useAbility();
  
  //Create form validation object
  const login = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  
  //Form submit function
  const onSubmitLogin = async (values: any) => {
    values = values as User;
    // Clear existing errors
    store.logout();
  
    if (submitButton.value) {
      submitButton.value.disabled = true;
      submitButton.value.setAttribute("data-kt-indicator", "on");
    }
  
    try {
      const userData = await store.login(values);
      const error = Object.values(store.errors);
      if (error.length === 0) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(async () => {
          // Go to page after successful login
          await store.getPermissions(userData.role);
          await setPermissionScope(userData)
          await setParentBu(userData)
          const pages = MainMenuConfig[0].pages
          let redirect = defaultRedirect(can, pages)
          if (redirect.sub) redirect = defaultRedirect(can, redirect.sub)
          router.push(redirect.route)
        });
      }
    } catch (error) {
    } finally {
      if (submitButton.value) {
        submitButton.value.removeAttribute("data-kt-indicator");
        submitButton.value.disabled = false;
      }
    }
  };
  const setPermissionScope = async (user: any) => {
    const permissionScope = await userRoleEntity.getAssignedPermissionsListAsync(user?.role)
    localStorage.setItem('permissionsScope', JSON.stringify(permissionScope))
  }

  const setParentBu = async (user: any) => {
    const parentBu = await userBussinessUnitEntity.fetchItemAsync(user?.businessUnitId)
    localStorage.setItem('parentBuPermission', JSON.stringify(parentBu))
  }
  </script>
  