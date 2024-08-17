<template>
  <el-form-item :label="field?.name" :prop="field?.name">
    <el-select-v2
      :id="props.field?.name"
      class="w-100"
      v-model="selectedValues"
      :options="options"
      :placeholder="filters.ConvertCamelToTitleName(props.field.placeholder)"
      multiple
      :disabled="field!.disabled"
    />
  </el-form-item>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { useInput } from '@/composables/FormInput'

const props = defineProps({
  modelValue: String,
  field: Object
})

const emit = defineEmits(['update:modelValue'])

const options = computed(() => {
  return props.field?.options.map((e: String) => ({
    value: e,
    label: e
  }))
})

const { model, filters } = useInput(props, emit)

const selectedValues = computed({
  get: () => (props.modelValue ? props.modelValue.split(',') : []),
  set: (newValue) => {
    emit('update:modelValue', newValue.join(','))
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    selectedValues.value = newValue ? newValue.split(',') : []
  }
)
</script>
