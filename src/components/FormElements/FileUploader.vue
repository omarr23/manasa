<template>
  <!-- Form item with dynamic label and property binding -->
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.name)"
    :prop="props.field?.name"
  >
    <!-- Input element with model binding and styling class -->
    <el-upload
      :id="props.field?.name"
      class="w-100"
      :on-change="(file: File) => handleImageUpload(field?.name, ['csv', 'jpeg', 'png'], file)"
      :before-upload="() => false"
    >
      <el-button size="small" type="button">Click to upload</el-button>
    </el-upload>
    <div class="fileList">{{ fileName }}</div>
  </el-form-item>
</template>

<script lang="ts" setup>
import { useInput } from '@/composables/FormInput'
import { ref } from 'vue'
import { useMediaStore } from '@/stores/media'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import filters from '@/core/helpers/filters'

// Define props for model value and field object
const props = defineProps({
  modelValue: String,
  field: Object
})

const media = useMediaStore()
// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])
const fileName = ref('')
const handleImageUpload = async (name: string, allowedExtensions: Array<any>, file: File | any) => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase()
  const isValidExtension = allowedExtensions.some((ext) => {
    return ext.toLowerCase().includes(fileExtension)
  })
  if (!isValidExtension) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Invalid File Type'
    }).then(() => {})
    return
  }

  const fileData = await media.fileUpload(file.raw)
  emit('update:modelValue', fileData.id)
  fileName.value = file.name
}
</script>
