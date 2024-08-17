<template>
  <div v-if="isInitalized">
    <el-form
      ref="formRef"
      label-position="top"
      :model="props.formData"
      :rules="rules"
      status-icon
      class="p-4"
    >
      <el-row :gutter="20">
        <template v-for="field in props.formFields">
          <el-col :span="24" :lg="12" :key="field.name" v-if="shouldDisplayField(field)">
            <component
              :is="components[field.attributeType]"
              v-model="props.formData![field.name]"
              :field="field"
              v-bind="$attrs"
            />
          </el-col>
        </template>

        <el-col :span="24">
          <!--begin::Button Submit-->
          <button class="btn btn-primary mb-4" type="button" @click="submitForm(formRef)">
            <span class="indicator-label"> Submit </span>
          </button>
          <!--end::Button Submit-->

          <!--begin::Button Cancel-->
          <button class="btn btn-light me-3 mb-4" type="button" @click="resetForm(formRef)">
            Cancel
          </button>
          <!--end::Button Cancel-->
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import JwtService from '@/core/services/JwtService'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Input from '@/components/FormElements/Input.vue'
import Radio from '@/components/FormElements/Radio.vue'
import Checkbox from '@/components/FormElements/Checkbox.vue'
import Select from '@/components/FormElements/Select.vue'
import MultiSelect from '@/components/FormElements/MultiSelect.vue'
import Date from '@/components/FormElements/Date.vue'
import DateTime from '@/components/FormElements/DateTime.vue'
import Time from '@/components/FormElements/Time.vue'
import InputNumber from '@/components/FormElements/InputNumber.vue'
import InputPassword from '@/components/FormElements/InputPassword.vue'
import ImageUploader from '@/components/FormElements/ImageUploader.vue'
import FileUploader from '@/components/FormElements/FileUploader.vue'
import Textarea from '@/components/FormElements/Textarea.vue'
import HasOneRelation from '@/components/FormElements/HasOneRelation.vue'
import UserRole from '@/components/FormElements/UserRole.vue'
import MultiImageUploader from '@/components/FormElements/MultiImageUploader.vue'
import MultiSelectCommaSeparated from '@/components/FormElements/MultiSelectCommaSeparated.vue'
const components = {
  Input,
  Radio,
  Checkbox,
  Select,
  MultiSelect,
  Date,
  DateTime,
  Time,
  InputNumber,
  ImageUploader,
  FileUploader,
  Textarea,
  HasOneRelation,
  UserRole,
  MultiImageUploader,
  InputPassword,
  MultiSelectCommaSeparated
}

const props = defineProps({
  formFields: Array<any>,
  defaultFormFields: Array<any>,
  formData: Object,
  initialData: Object,
  mode: String
})

const formRef = ref()
const modelData = ref({})
const router = useRouter()
const user = JwtService.getUser()
const isInitalized = ref(false)

const rules = computed(() => {
  return Object.fromEntries(props.formFields!.map((e: any) => [e.name, e.rules]))
})
const shouldDisplayField = (field: any) => {
  return (
    (field.display &&
      ((props.mode === 'create' && field.display['create']) ||
        (props.mode === 'edit' && field.display['edit']))) ||
    (field.attributeType === 'HasOneRelation' && !field.isHidden)
  )
}
const emit = defineEmits(['submit', 'resetConstraints'])
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      emit('submit', props.formData)
    } else {
      console.log('error submit!', props.formData)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  emit('resetConstraints')
  return router.go(-1)
}
const setInitalData = () => {
  isInitalized.value = false
  modelData.value = JSON.parse(JSON.stringify(props.formData))

  if (props.initialData) {
    props.formFields!.forEach((e: any) => {
      props.formData![e.name] = props.initialData![e.name]
    })
    props.defaultFormFields!.forEach((e: any) => {
      props.formData![e.name] = props.initialData![e.name]
    })
  }

  isInitalized.value = true
}
onMounted(() => {
  setInitalData()
})
onUnmounted(() => {
  for (const i in props.formData) {
    // eslint-disable-next-line vue/no-mutating-props
    props.formData[i] = modelData.value[i]
  }
})
</script>
