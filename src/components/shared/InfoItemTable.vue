<template>
  <div>
    <div v-if="type === 'hasOne'">
      {{ data ? data[displayName!] : "N/A" }}
    </div>

    <div v-else-if="type === 'boolean'">
      <i class="bi bi-x-lg fs-3 text-danger" v-if="!data"></i>
      <i
        class="bi bi-x-lg fs-3 text-danger"
        v-else-if="data == 'SUSPENDED'"></i>
      <i class="bi bi-check-all fs-1 text-success" v-else></i>
    </div>

    <div v-else-if="type === 'enum'">
      <span v-for="item in data" :key="item">{{ item }}</span>
    </div>

    <div v-else-if="type === 'image'">
      <img
        v-if="data && data.url"
        :href="data?.url"
        :height="75"
        :src="data.url"
        class="m-1 rounded"
        :alt="data.fileName" />
      <img
        v-else
        src="https://placehold.co/600x400"
        :height="75"
        class="m-1 rounded"
        alt="Rounded image" />
    </div>

    <div v-else-if="type === 'file'">
      <a v-if="data && data.url" :href="data.url" target="_blank">
        {{ data.fileName }}
      </a>
      <span v-else>{{ $t("action.file_not_available") }}</span>
    </div>

    <div v-else-if="['dateTime', 'modifiedAt', 'createdAt'].includes(type!)">
      {{ data && filters.FormatDateTime(data) }}
    </div>
    <div v-else-if="type === 'time'">
      {{ data && filters.FormatTime(data) }}
    </div>
    <div v-else-if="type === 'date'">
      {{ data && filters.FormatDate(data) }}
    </div>

    <div v-else>
      {{ data ? data : "N/A" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import filters from "@/core/helpers/filters";

const props = defineProps({
  data: [Object, String, Number, Boolean] as any,
  type: String,
  displayName: String,
});
</script>
