<template>
  <el-form-item
    :label="filters.ConvertCamelToTitleName(props.field?.relationName)"
    :prop="props.field?.name"
  >
    <el-select
      :id="props.field?.name"
      class="w-100"
      v-model="model"
      :placeholder="filters.ConvertCamelToTitleName(props.field.placeholder)"
      filterable
      remote
      :remote-method="fetchData"
      :loading="loading"
      :disabled="props.field.isDisable"
    >
      <el-option
        class="option"
        v-for="item in options"
        :key="item.id"
        :label="item[props.field?.displayName]"
        :value="item.id"
      />
      <template #footer v-if="response && response.data.hasNextPage">
        <button class="btn btn-link btn-footer w-100" @click="viewMore()">View more</button>
      </template>
    </el-select>
    <!-- Adding the footer outside of the el-select component to avoid extraneous children error -->
  </el-form-item>
</template>

<script lang="ts" setup>
import axios from 'axios'
import { useInput } from '@/composables/FormInput'
import { ref, watch, onMounted } from 'vue'

// Define props for model value and field object
const props = defineProps({
  modelValue: Number,
  field: Object
})

const options = ref<any[]>([]) // Define options as an array of any type
const response = ref()
// Define emit function to update model value
const emit = defineEmits(['update:modelValue', 'checkPermissions'])
const params = ref<string>('')
const page = ref<number>(1)
const loading = ref(true)

// Custom hook to handle input interactions
const { model, filters } = useInput(props, emit)
const updateParamsFilter = (query, constrain) => {
  // Combine searchFilter and other filters
  const combinedFilters = [query, constrain].filter((f) => f && f.length > 0)
  params.value = combinedFilters.join(' and ')
}
const fetchData = async (query?: string) => {
  try {
    let newconstrain = mergeConstrains()
    loading.value = true
    if (newconstrain !== '') params.value = newconstrain
    if (query) {
      updateParamsFilter(`scope search ("${query}")`, newconstrain)
    }
    if (newconstrain && newconstrain.includes('null')) return
    response.value = await axios.get(`${import.meta.env.BASE_URL + props.field?.label}`, {
      params: { filter: params.value ? params.value : null, page: page.value, take: 10 }
    })
    if (page.value === 1) {
      options.value = response.value.data.content
    } else {
      options.value = [...options.value, ...response.value.data.content]
    }
    loading.value = false
  } catch (error) {
    console.error(error)
    loading.value = false
  }
}
const viewMore = () => {
  page.value += 1
  fetchData()
}
const mergeConstrains = () => {
  let newconstrains: any = []

  if (props.field?.constrains.length > 0) {
    props.field?.constrains.forEach((element: any) => {
      const op = element.op ? element.op : 'eq'
      const newValue = typeof element.value === 'string' ? `"${element.value}"` : `${element.value}`
      newconstrains.push(`${element.key} ${op} ${newValue}`)
    })

    // Join constraints with ' and ' separator
  }
  return newconstrains.join(' and ')
}
watch(
  () => props.field?.constrains,
  async () => {
    page.value = 1
    await fetchData()
    emit('update:modelValue', null)
  }
)
watch(
  () => model.value,
  async () => {
    emit('checkPermissions', {
      value: model.value,
      key: props.field?.name
    })
  }
)
onMounted(async () => {
  await fetchData()
})
</script>
<style scoped>
.footer {
  overflow-x: hidden;
}
.line {
  opacity: 0.3;
  margin: 0;
}
.btn-footer {
  font-size: 1rem;
  margin: 0 10px 0px 16px;
  text-align: left;
}
</style>
