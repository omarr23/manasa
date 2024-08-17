<template>
  <!-- Form item with dynamic label and property binding -->
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.label)"
    :prop="props.field?.name"
  >
    <!-- Date picker element with model binding, type set to "date", and styling class -->
    <el-date-picker
      :id="props.field?.name"
      class="w-100"
      type="date"
      :placeholder="filters.ConvertCamelToTitleName(props.field!.placeholder)"
      :disabled="field!.disabled"
      v-model="model"
    />
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
