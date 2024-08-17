<template>
  <div>
    <el-form
      ref="formRef"
      label-position="top"
      :model="props.filterFormData"
      :rules="rules"
      status-icon
      class="p-4 form-container"
    >
      <el-row :gutter="20">
        <template v-for="field in props.filterFields" :key="field.name">
          <!-- Single Field Rendering -->
          <el-col :span="24" :lg="24" v-if="!field.fields">
            <component
              :is="components[field.attributeType]"
              v-model="props.filterFormData[field.name]"
              :field="field"
            />
          </el-col>

          <!-- Grouped Fields Rendering -->
          <el-col :span="24" :lg="24" v-else>
            <div class="grouped-field">
              <label class="fs-5">{{ field.label }}</label>
              <el-row :gutter="10">
                <template v-for="subField in field.fields" :key="subField.name">
                  <el-col :span="12">
                    {{ subField.label }}
                    <component
                      :is="components[field.attributeType]"
                      v-model="props.filterFormData[subField.name]"
                      :field="subField"
                    />
                  </el-col>
                </template>
              </el-row>
            </div>
          </el-col>
        </template>

        <el-col :span="24" class="form-footer">
          <!--begin::Button Submit-->
          <button class="btn btn-primary mb-4" type="button" @click="submitForm(formRef)">
            <span class="indicator-label"> Submit </span>
          </button>
          <!--end::Button Submit-->

          <!--begin::Button Cancel-->
          <button class="btn btn-light me-3 mb-4" type="button" @click="resetForm(formRef)">
            Reset
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
import filters from '@/core/helpers/filters'
import moment from 'moment'
import { useRouter } from 'vue-router'
import Input from '@/components/FormElements/Input.vue'
import Radio from '@/components/FormElements/Radio.vue'
import Checkbox from '@/components/FormElements/Checkbox.vue'
import Select from '@/components/FormElements/Select.vue'
import MultiSelect from '@/components/FormElements/MultiSelect.vue'
import Date from '@/components/FormElements/Date.vue'
import DateTime from '@/components/FormElements/DateTime.vue'
import DateRange from '@/components/FormElements/DateRange.vue'
import Time from '@/components/FormElements/Time.vue'
import InputNumber from '@/components/FormElements/InputNumber.vue'
import ImageUploader from '@/components/FormElements/ImageUploader.vue'
import FileUploader from '@/components/FormElements/FileUploader.vue'
import Textarea from '@/components/FormElements/Textarea.vue'
import HasOneRelation from '@/components/FormElements/HasOneRelation.vue'
import UserRole from '@/components/FormElements/UserRole.vue'
import MultiImageUploader from '@/components/FormElements/MultiImageUploader.vue'
const components = {
  Input,
  Radio,
  Checkbox,
  Select,
  MultiSelect,
  Date,
  DateTime,
  DateRange,
  Time,
  InputNumber,
  ImageUploader,
  FileUploader,
  Textarea,
  HasOneRelation,
  UserRole,
  MultiImageUploader
}

const props = defineProps({
  filterFields: Array,
  filterFormData: Object,
  filterOperation: {
    type: String,
    default: ' and '
  }
})

const formRef = ref()

const rules = computed(() => {
  return Object.fromEntries(props.filterFields!.map((e: any) => [e.name, e.rules]))
})

const emit = defineEmits(['submit', 'resetForm'])

const processField = (field, filter) => {
  switch (field.type) {
    case 'searchScope':
      filter.push(`scope search("${props.filterFormData[field.name]}")`)
      break
    case 'contains':
      filter.push(`${field.name} contains "${props.filterFormData[field.name]}"`)
      break
    case 'match':
      filter.push(`${field.name} ${field.op} "${props.filterFormData[field.name]}"`)
      break
    case 'range':
      if (field.attributeType === 'Time') {
        const formattedValue = moment(
          '1970-01-01T' + filters.FormatTime(props.filterFormData[field.name])
        ).toISOString()
        filter.push(`${field.key} ${field.op} "${formattedValue}"`)
      } else if (field.attributeType === 'DateTime' || field.attributeType === 'Date') {
        const formattedValue = moment(props.filterFormData[field.name]).toISOString()
        filter.push(`${field.key} ${field.op} "${formattedValue}"`)
      } else {
        filter.push(`${field.key} ${field.op} ${props.filterFormData[field.name]}`)
      }
      break
    case 'boolean':
      filter.push(`${field.key} ${field.op} ${props.filterFormData[field.name]}`)
      break
  }
}
const setFormFiledsData = () => {
  const filter = []
  props.filterFields?.forEach((item: any) => {
    if (item.fields) {
      // Handle grouped fields
      item.fields.forEach((subItem) => {
        if (props.filterFormData[subItem.name]) {
          processField(subItem, filter)
        }
      })
    } else if (props.filterFormData[item.name]) {
      // Handle regular fields
      processField(item, filter)
    }
  })
  return filter
}
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      const filter = setFormFiledsData()
      emit('submit', filter)
    } else {
      console.log('error submit!', props.filterFormData)
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
  emit('resetForm')
}
</script>
<style scoped>
.form-container {
  position: relative;
  padding-bottom: 60px;
  max-height: 290px;
  overflow-y: auto;
  position: relative;
}

.form-footer {
  position: fixed;
  bottom: -60px;
  left: 0;
  right: 0;
  padding: 10px;
  background-color: white;
  border-top: 1px solid #e0e0e0;
  z-index: 1000;
}
.grouped-field {
  display: flex;
  flex-direction: column;
}
.grouped-field label {
  margin-bottom: 10px;
}
.grouped-field .el-row {
  display: flex;
  align-items: center;
}
</style>
