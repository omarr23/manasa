<template>
  <!-- Form item with dynamic label and property binding -->
  <el-form-item :label="props.field.name" :prop="props.field.name">
    <!-- Select dropdown element with model binding and styling class -->
    <el-select
      :id="props.field?.name"
      class="w-100"
      v-model="model"
      :placeholder="filters.ConvertCamelToTitleName(props.field.placeholder)"
    >
      <!-- Loop through options and create select options -->
      <el-option v-for="item in options" :key="item.code" :label="item.code" :value="item.code" />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { useInput } from '@/composables/FormInput'
import { onMounted, ref } from 'vue'
import axios from 'axios'

// Define props for model value and field object
const props = defineProps({
  modelValue: String,
  field: Object
})

// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])

// Custom hook to handle input interactions
const { model, filters } = useInput(props, emit)
const options = ref([])

const fetchData = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_AUTH_BASE_URL + 'roles'}`)

    options.value = response.data.content
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await fetchData()
})
</script>
