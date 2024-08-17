<template>
  <div v-if="dashboard">
    <div class="d-flex justify-content-end mb-2">
      <a class="btn btn-primary" :href="dashboard.editURL" target="_blank" v-if="dashboard.editURL">
        <KTIcon icon-name="user-edit" icon-class="fs-2" />
        Edit Dashboard
      </a>
    </div>
    <iframe
      v-if="!isLoading"
      :src="`${dashboard.publicURL}#theme=${themeMode === 'dark' ? 'night' : 'light'}`"
      frameborder="0"
      width="100%"
      height="1000px"
      allowtransparency
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, nextTick } from 'vue'

/* Store */
import { useDashboardStore } from '@/stores/dashboard'
import { storeToRefs } from 'pinia'
import { themeMode } from '@/layouts/default-layout/config/helper'

const store = useDashboardStore()
const { dashboard } = storeToRefs(store)
const isLoading = ref(false)

watch(themeMode, async () => {
  isLoading.value = true
  nextTick(() => {
    isLoading.value = false
  })
})
onMounted(async () => {
  isLoading.value = true
  await store.getDashboard()
  isLoading.value = false
})
</script>
