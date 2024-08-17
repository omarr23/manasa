<template>
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.name)"
    :prop="props.field.name"
    v-if="isInitalized"
  >
    <el-upload
      :id="props.field?.name"
      width="400px"
      v-model:file-list="fileList"
      :accept="props.accept"
      :action="uploadUrl"
      :on-change="handleSuccess()"
      multiple
    >
      <el-button>
        Browse
        <el-icon class="el-icon--right">
          <Upload />
        </el-icon>
      </el-button>
    </el-upload>
  </el-form-item>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Upload } from '@element-plus/icons-vue'
import filters from '@/core/helpers/filters.ts'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  accept: {
    type: String,
    default: '*/*'
  },
  modelValue: {
    type: Array as () => UploadUserFile[],
    default: () => null
  },
  field: Object
})

const uploadUrl = `${import.meta.env.VITE_APP_API_URL}file/upload`
const fileList = ref<UploadUserFile[]>([])
const isInitalized = ref(false)

const handleSuccess = () => {
  const files = fileList.value.filter((file) => file.response).map((file) => file.response)

  emit('update:modelValue', files)
}

onMounted(() => {
  isInitalized.value = false
  if (props.modelValue)
    fileList.value = props.modelValue.map((file) => ({
      name: file.fileName,
      url: file.url,
      response: file
    }))
  isInitalized.value = true
})
</script>
<style lang="scss">
.el-upload {
  width: 350px;

  button {
    width: 100%;
  }
}
</style>
