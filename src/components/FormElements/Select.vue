<template>
  <!-- Form item with dynamic label and property binding -->
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.name)"
    :prop="props.field?.name"
  >
    <!-- Select dropdown element with model binding and styling class -->
    <el-select
      :id="props.field?.name"
      class="w-100"
      v-model="model"
      :placeholder="filters.ConvertCamelToTitleName(props.field!.placeholder)"
      :disabled="field!.disabled"
      filterable
    >
      <!-- Loop through options and create select options -->
      <el-option v-for="item in props.field?.options" :key="item" :label="item" :value="item" />
    </el-select>
  </el-form-item>
</template>

<script lang="ts" setup>
import { useInput } from '@/composables/FormInput'

// Define props for model value and field object
const props = defineProps({
  modelValue: String,
  field: Object
})

// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])

// Custom hook to handle input interactions
const { model, filters } = useInput(props, emit)
</script>
