<template>
  <!-- Form item with label and property -->
  <el-form-item :label="field?.name" :prop="field?.name">
    <!-- Select dropdown element -->
    <el-select-v2
      :id="props.field?.name"
      class="w-100"
      v-model="model"
      :options="options"
      :placeholder="filters.ConvertCamelToTitleName(props.field.placeholder)"
      multiple
      :disabled="field!.disabled"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useInput } from '@/composables/FormInput'

// Define props for model value and field object
const props = defineProps({
  modelValue: String,
  field: Object
})

// Define emit function to update model value
const emit = defineEmits(['update:modelValue'])

// Computed property to map field options to value-label pairs
const options = computed(() => {
  return props.field?.options.map((e: String) => ({
    value: e,
    label: e
  }))
})

// Custom hook to handle input interactions
const { model, filters } = useInput(props, emit)
</script>
