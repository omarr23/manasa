<template>
  <div>
    <div class="card">
      <div class="card-body">
        <el-form
          ref="ruleFormRef"
          :rules="rules"
          :model="form"
          label-width="auto"
          status-icon
          class="form el-form el-form--default el-form--label-right el-form el-form--large el-form--label-top"
        >
          <el-form-item label="Code" prop="code">
            <el-input v-model="form.code" placeholder="Code" type="text" />
          </el-form-item>

          <!-- Repeat for each language -->
          <el-row :gutter="20">
            <el-col v-for="lang in langStore.Languages" :key="lang.key" :span="12">
              <el-form-item
                :label="$t(`UserRoles.name_${lang.key}`)"
                :prop="`nameTranslations.name_${lang.key}`"
              >
                <el-input
                  :label="$t(`UserRoles.name_${lang.key}`)"
                  v-model="form.nameTranslations[`name_${lang.key}`]"
                  @input="setCodeField(lang.key, $event)"
                />
              </el-form-item>

              <el-form-item
                :label="$t(`UserRoles.description_${lang.key}`)"
                :prop="`descriptionTranslations.description_${lang.key}`"
                type="textarea"
              >
                <el-input v-model="form.descriptionTranslations[`description_${lang.key}`]" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Status" prop="status">
            <el-checkbox
              v-model="form.status"
              :false-label="'SUSPENDED'"
              :true-label="'ACTIVE'"
            ></el-checkbox>
          </el-form-item>

                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm(ruleFormRef)"
                            >Submit</el-button
                        >
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useLangStore } from '@/stores/lang'
import { useUserRoleStore } from '@/stores/userRole'
import { ref, reactive } from 'vue'
import * as _ from 'lodash'
import type { FormInstance, FormRules } from 'element-plus'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { useValidator } from '@/core/helpers/useValidator'

const langStore = useLangStore()
const userRole = useUserRoleStore()

langStore.fetchList()
const { t } = useI18n()

const { checkAr, checkEn } = useValidator()
const { push } = useRouter()

const ruleFormRef = ref<FormInstance>();
const form = reactive<any>({
  nameTranslations: {},
  descriptionTranslations: {},
  status: 'SUSPENDED',
  code: ''
})

const rules = reactive<FormRules>({
  code: [{ required: true }],
  'nameTranslations.name_ar': [
    { required: true, message: t('UserRoles.name_ar_required') },
    { validator: checkAr }
  ],
  'nameTranslations.name_en': [
    { required: true, message: t('UserRoles.name_en_required') },
    { validator: checkEn }
  ],
  'descriptionTranslations.description_ar': [{ validator: checkAr }],
  'descriptionTranslations.description_en': [{ validator: checkEn }]
})

const setCodeField = (lang: string, val: string) => {
  if (lang === 'en') form.code = _.kebabCase(val)
}

const submitForm = async (formEl: FormInstance | undefined) => {
  const role: {
    nameTranslations: {}
    descriptionTranslations: {}
    status: string
    code: string
    roleTranslations: {
      name: string
      description: string
      lang: string
    }[]
  } = {
    nameTranslations: {},
    descriptionTranslations: {},
    status: '',
    code: '',
    roleTranslations: []
  }

  role.status = form.status!
  role.code = form.code!

  for (let i = 0; i < langStore.Languages.length; i++) {
    const lang = langStore.Languages[i]
    role['roleTranslations'].push({
      name: form.nameTranslations[`name_${lang.key}`],
      description: form.descriptionTranslations[`description_${lang.key}`],
      lang: lang.key
    })
  }

  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      userRole
        .createRole(role)
        .then((res) => {
          if (res) {
            Swal.fire('Success', 'Role Created Successfully', 'success').then()
            push(`/userRole-view/${role.code}`)
          }
        })
        .catch((error) => {
          // Handle error here
        })
    } else {
      return false
    }
  })
}
</script>
<style>
.el-form-item__label-wrap {
    margin: 0px !important;
}
</style>
