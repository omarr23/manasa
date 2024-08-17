<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeMount, onMounted } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useConfigStore } from '@/stores/config'
import { useThemeStore } from '@/stores/theme'
import { useBodyStore } from '@/stores/body'
import { themeConfigValue } from '@/layouts/default-layout/config/helper'
import { initializeComponents } from '@/core/plugins/keenthemes'
import { useUserRoleStore } from './stores/userRole'
import { useBusinessUnitStore } from './stores/businessUnit'
import { getUser } from './core/services/JwtService'
import { useAuthStore } from './stores/auth'

export default defineComponent({
  name: 'app',
  components: {
    RouterView
  },
  setup() {
    const configStore = useConfigStore()
    const themeStore = useThemeStore()
    const bodyStore = useBodyStore()
    const userRoleEntity = useUserRoleStore()
    const userBussinessUnitEntity = useBusinessUnitStore()
    const user = getUser()
    const userStore = useAuthStore()
    const router = useRouter()

    const setPermissionScope = async () => {
      if (user) {
        const permissionScope = await userRoleEntity.getAssignedPermissionsListAsync(user?.role)
        if (permissionScope[0] === 'Unauthorized') {
          userStore.logout()
          router.push({ name: 'sign-in' })
        } else {
          localStorage.setItem('permissionsScope', JSON.stringify(permissionScope))
        }
      }
    }
    const setParentBu = async () => {
      if (user) {
        const parentBu = await userBussinessUnitEntity.fetchItemAsync(user?.businessUnitId)
        localStorage.setItem('parentBuPermission', JSON.stringify(parentBu))
      }
    }
    onBeforeMount(() => {
      /**
       * Overrides the layout config using saved data from localStorage
       * remove this to use static config (@/layouts/default-layout/config/DefaultLayoutConfig.ts)
       */
      configStore.overrideLayoutConfig()

      /**
       *  Sets a mode from configuration
       */
      themeStore.setThemeMode(themeConfigValue.value)
    })

    onMounted(async () => {
      nextTick(() => {
        initializeComponents()
        bodyStore.removeBodyClassName('page-loading')
      })
      await setPermissionScope()
      await setParentBu()
    })
  }
})
</script>

<style lang="scss">
@import 'bootstrap-icons/font/bootstrap-icons.css';
@import 'apexcharts/dist/apexcharts.css';
@import 'quill/dist/quill.snow.css';
@import 'animate.css';
@import 'sweetalert2/dist/sweetalert2.css';
@import 'nouislider/dist/nouislider.css';
@import '@fortawesome/fontawesome-free/css/all.min.css';
@import 'socicon/css/socicon.css';
@import 'line-awesome/dist/line-awesome/css/line-awesome.css';
@import 'dropzone/dist/dropzone.css';
@import '@vueform/multiselect/themes/default.css';
@import 'prism-themes/themes/prism-shades-of-purple.css';
@import 'element-plus/dist/index.css';

// Main demo style scss
@import 'assets/keenicons/duotone/style.css';
@import 'assets/keenicons/outline/style.css';
@import 'assets/keenicons/solid/style.css';
@import 'assets/sass/element-ui.dark';
@import 'assets/sass/plugins';
@import 'assets/sass/style';

#app {
  display: contents;
}
.table-div {
  .el-upload {
    width: fit-content;

    button {
      width: fit-content;
    }
  }
}
</style>
