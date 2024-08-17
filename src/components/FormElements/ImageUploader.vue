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
      :on-change="(file: File) => handleImageUpload(field?.name, ['jpg', 'jpeg', 'png'], file)"
      list-type="picture-card"
      :before-upload="() => false"
    >
      <img v-if="dialogImageUrl" :src="dialogImageUrl.url" class="avatar" />
      <i v-if="!dialogImageUrl" class="bi bi-plus fs-lg-1"></i>
    </el-upload>
  </el-form-item>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useMediaStore } from '@/stores/media'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import filters from '@/core/helpers/filters'

// Define props for model value and field object
const props = defineProps({
  modelValue: Object,
  field: Object
})

const media = useMediaStore()
// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])

const dialogImageUrl = ref(props.modelValue)

const handleImageUpload = async (
  name: String,
  allowedExtensions: Array<String>,
  file: File | any
) => {
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
  emit('update:modelValue', fileData)
  dialogImageUrl.value = fileData
}
</script>
<style scoped>
.avatar {
  width: 100%;
  height: 100%;
  object-fit: none;
}
</style>
