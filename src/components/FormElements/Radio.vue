<template>
  <!-- Form item with dynamic label and property binding -->
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.name)"
    :prop="props.field?.name"
  >
    <!-- Input element with model binding and styling class -->
    <el-radio-group :id="props.field?.name" v-model="model" class="w-100">
      <el-radio
        v-for="option in props.field?.options"
        :key="option"
        :lable="option"
        :value="option"
        :disabled="field!.disabled"
      >
        {{ option }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script lang="ts" setup>
import { useInput } from '@/composables/FormInput'

// Define props for model value and field object
const props = defineProps({
  modelValue: [String, Number, Boolean],
  field: Object
})

// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])

// Custom hook to handle input interactions
const { model, filters } = useInput(props, emit)
</script>
