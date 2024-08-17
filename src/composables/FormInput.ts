import { computed } from 'vue'
import filters from '@/core/helpers/filters'

export function useInput(props, emit) {
  const model = computed({
    get() {
      return props.modelValue
    },

    set(value) {
      return emit('update:modelValue', value)
    }
  })

  return { model, filters }
}
