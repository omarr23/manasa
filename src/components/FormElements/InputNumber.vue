<template>
  <!-- Form item with dynamic label and property binding -->
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.label)"
    :prop="props.field?.name"
  >
    <!-- Input element with model binding and styling class -->
    <el-input-number
      :id="props.field?.name"
      class="w-100"
      :min="props.field?.min ? props.field?.min : 1"
      :max="props.field?.max ? props.field?.max : 1000000"
      v-model="model"
      :placeholder="filters.ConvertCamelToTitleName(props.field?.placeholder)"
      :disabled="field!.disabled"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { useInput } from '@/composables/FormInput'

// Define props for model value and field object
const props = defineProps({
  modelValue: Number,
  field: Object
})

// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])

// Custom hook to handle input interactions
const { model, filters } = useInput(props, emit)
</script>
