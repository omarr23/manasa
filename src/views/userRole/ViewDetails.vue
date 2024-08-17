<template>
  <section>
    <div id="kt_app_content_container" class="app-container container-fluid">
      <div class="card mb-5 mb-xl-10" id="kt_team_details_view">
        <!--begin::Card body-->
        <div class="px-9 mt-9">
          <div class="row mb-7">
            <div class="scopes">
              <h4>
                Permission Scopes
                <span class="text-uppercase" v-if="router.currentRoute.value.params.id"
                  >( {{ router.currentRoute.value.params.id }} )</span
                >
              </h4>
              <div class="guid-list">
                <div class="guid-item" v-for="item in scopeList" :key="item">
                  <span :class="`shape ${item}-shape`"></span>
                  <span class="label">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
          <!--begin::Row-->
          <div class="row mb-7">
            <div class="position-relative">
              <table
                class="table table-striped table-row-dashed table-row-gray-300 gy-7"
                v-if="permissions"
              >
                <thead class="table-header">
                  <tr>
                    <th>Entity</th>
                    <th class="header-entity" v-for="item in permissionKeys" :key="item">
                      {{ item }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(permission, entity) in permissions" :key="entity">
                    <td>{{ entity }}</td>
                    <td v-for="(item, index) in permissionKeys" :key="item">
                      <permissionPopover
                          v-if="
                          !(entity === 'file' && item === 'assign ownership') &&
                          !(entity === 'businessUnit' && item === 'assign ownership') &&
                          !(entity === 'eventConfiguration' && item === 'assign ownership') &&
                          !(entity === 'user' && item === 'assign ownership')
                        "
                        :scopeList="scopeList"
                        :permission="
                          checkPermission(
                            permission && permission[index] ? permission[index].code : null
                          )
                        "
                        :code="permission && permission[index] ? permission[index].code : null"
                        @assign="assignPermission"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!--end::Card body-->
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useUserRoleStore } from '@/stores/userRole'
import { useRouter } from 'vue-router'
import permissionPopover from '@/components/permissonPopover.vue'

const store = useUserRoleStore()
const router = useRouter()
const permissionKeys = ref(['add', 'delete', 'edit', 'list', 'view', 'assign ownership'])
const scopeList = ref(['NONE', 'OWNER', 'BU', 'PARENTBU', 'ALL'])
const assignedPermissions = ref()
const permissions = ref()
onMounted(async () => {
  assignedPermissions.value = await store.getAssignedPermissionsListAsync(
    router.currentRoute.value.params.id
  )
  permissions.value = await store.getPermissionsList()
})
const checkPermission = (permission) => {
  let found = null
  for (let i = 0; i < assignedPermissions.value.length; i++) {
    if (assignedPermissions.value[i].permissionCode === permission) {
      found = assignedPermissions.value[i]
      break
    }
  }
  return found
}
const assignPermission = async (data: any) => {
  const assignedValue = await store.assignPermission(data, router.currentRoute.value.params.id)

  const currentPermission = assignedPermissions.value.find(
    (item: any) => item.permissionCode === data.permissionCode
  )
  if (assignedValue) {
    if (currentPermission) currentPermission.permissionScope = data.permissionScope
    else
      assignedPermissions.value.push({
        id: assignedValue.id,
        roleCode: router.currentRoute.value.params.id,
        permissionCode: data.permissionCode,
        permissionScope: data.permissionScope,
        configurable: true
      })
  }
}
onUnmounted(() => {
  store.resetItemData()
})
</script>
<style lang="scss">
.scopes {
  display: flex;
  flex-direction: column;
  padding: 0 25px;
  .guid-list {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
    .guid-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .shape {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 5px;
        border-width: 2px;
        border-style: solid;
      }
      .label {
        font-size: 14px;
        font-weight: 500;
      }
    }
    .NONE-shape {
      border-color: #ff4000;
    }
    .PARENTBU-shape {
      border-color: #bcb994;
      background-color: #bcb994;
    }
    .OWNER-shape {
      border-color: #ffd700;
      background-color: #ffd700;
    }
    .BU-shape {
      border-color: #301813;
      background-color: #301813;
    }
    .ALL-shape {
      border-color: #b9a69b;
      background-color: #b9a69b;
    }
  }
}
</style>
<style lang="scss" scoped>
.position-relative {
  overflow-y: auto;
  max-height: 60vh;
}
.table-header {
  font-weight: bold;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
}
.header-entity {
  width: 10%;
}
</style>
