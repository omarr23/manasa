<template>
  <div>
    <div class="card">
      <div class="card-body">
        <Form
          :model="form"
          ref="formRef"
          label-position="top"
          @submit="submitForm"
          class="form el-form el-form--default el-form--label-right el-form el-form--large el-form--label-top"
        >
          <Field
            name="code"
            rules="required"
            v-slot="{ field, errors }"
            :value="form.code"
            v-model="form.code"
            :disabled="true"
          >
            <el-form-item label="Code" prop="code" :error="errors[0]">
              <el-input
                v-model="form.code"
                placeholder="Code"
                type="text"
                v-bind="field"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </Field>

          <!-- Repeat for each language -->
          <el-row :gutter="20">
            <el-col v-for="lang in langStore.Languages" :key="lang.key" :span="12">
              <Field
                :name="`name_${lang.key}`"
                :rules="`required|${lang.key}`"
                v-slot="{ field, errors }"
                :value="form.roleTranslations[lang.key]"
                v-model="form[`name_${lang.key}`]"
              >
                <el-form-item
                  :label="`Name (${lang.key})`"
                  :prop="`name_${lang.key}`"
                  :error="errors[0]"
                >
                  <el-input
                    :placeholder="`Name (${lang.key})`"
                    type="text"
                    v-model="form[`name_${lang.key}`]"
                    v-bind="field"
                  ></el-input>
                </el-form-item>
              </Field>

              <Field
                :name="`description_${lang.key}`"
                :rules="`${lang.key}`"
                v-slot="{ field, errors }"
                :value="form[`description_${lang.key}`]"
                v-model="form[`description_${lang.key}`]"
              >
                <el-form-item
                  :label="`Description (${lang.key})`"
                  :prop="`description_${lang.key}`"
                  :error="errors[0]"
                >
                  <el-input
                    :placeholder="`Description (${lang.key})`"
                    type="textarea"
                    v-model="form[`description_${lang.key}`]"
                    v-bind="field"
                  ></el-input>
                </el-form-item>
              </Field>
            </el-col>
          </el-row>

          <Field name="status" v-slot="{ field }">
            <el-form-item label="Status" prop="status">
              <el-checkbox
                v-model="form.status"
                :false-label="'SUSPENDED'"
                :true-label="'ACTIVE'"
                v-bind="field"
              ></el-checkbox>
            </el-form-item>
          </Field>

          <el-form-item>
            <el-button type="primary" native-type="submit">Submit</el-button>
            <el-button type="primary" native-type="submit">Submit</el-button>
          </el-form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useLangStore } from '@/stores/lang'
import { useUserRoleStore } from '@/stores/userRole'
import { ref } from 'vue'
import { Form, Field } from 'vee-validate'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import Swal from 'sweetalert2/dist/sweetalert2.js'

const langStore = useLangStore()
const userRole = useUserRoleStore()
const router = useRouter()
langStore.fetchList()
const formRef = ref()
const { push } = useRouter()

const form = ref({
  roleTranslations: [] as {
    name: string
    description: string
    lang: string
  }[],
  status: 'SUSPENDED',
  code: null,
  parentRoleCode: null,
  type: null
})
onMounted(async () => {
  if (router.currentRoute.value.params.id) {
    await userRole.getRole(router.currentRoute.value.params.id)
    if (userRole.itemData !== null) {
      form.value = userRole.itemData
      langStore.Languages.forEach((key, index) => {
        if (userRole && userRole.itemData) {
          form.value[`name_${key.key}`] = (
            userRole.itemData as {
              roleTranslations: {
                name: string
                description: string
                lang: string
              }[]
            }
          ).roleTranslations[index].name
          form.value[`description_${key.key}`] = (
            userRole.itemData as {
              roleTranslations: {
                name: string
                description: string
                lang: string
              }[]
            }
          ).roleTranslations[index].description
        }
      })
    }
  }
})
const submitForm = () => {
  const role: {
    roleTranslations: {
      name: string
      description: string
      lang: string
    }[]
    status: string
    code: string
    parentRoleCode: String
    type: String
  } = {
    roleTranslations: [],
    status: '',
    code: '',
    parentRoleCode: '',
    type: ''
  }
  role.status = form.value.status!
  role.code = form.value.code!
  role.parentRoleCode = form.value.parentRoleCode!
  role.type = form.value.type!
  for (let i = 0; i < langStore.Languages.length; i++) {
    const lang = langStore.Languages[i]
    role.roleTranslations.push({
      name: form.value[`name_${lang.key}`],
      description: form.value[`description_${lang.key}`],
      lang: lang.key
    })
  }
  formRef.value.validate().then((valid: any) => {
    if (valid.valid) {
      userRole.updateRole(role).then((res) => {
        if (res) {
          Swal.fire('Success', 'Role Created Successfully', 'success').then(() => {
            push(`/userRole-view/${role.code}`)
          })
        }
      })
    } else {
      return false
    }
  })
}
</script>

<style scoped></style>
