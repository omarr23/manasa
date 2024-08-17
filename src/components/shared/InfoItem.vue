<template>
  <div class="mt-2" v-if="data !== undefined">
    <div class="row mb-7">
      <label class="col-lg-4 fw-semobold text-muted">{{
        filters.ConvertCamelToTitleName(label)
      }}</label>

      <div class="col-lg-8">
        <div class="fw-bold fs-6" v-if="data !== null && data !== undefined">
          <div v-if="type == 'hasOne'">{{ data[displayName!] ? data[displayName!] : '--' }}</div>

          <div v-else-if="type === 'boolean'">
            <i class="bi bi-check-all fs-1" v-if="data"></i>
            <i class="bi bi-x-lg fs-3" v-else></i>
          </div>
          <div v-else-if="type === 'image'">
            <img
              :src="data && data?.url ? data.url : ''"
              :height="150"
              class="m-1 rounded"
              alt="Rounded image"
            />
          </div>
          <div v-else-if="data && type === 'MultiImageUploader'">
            <template v-for="(item, index) in data" :key="index">
              <img
                :src="item && item?.url ? item.url : ''"
                :height="150"
                :width="200"
                class="m-1 rounded"
                alt="Rounded image"
              />
            </template>
          </div>
          <div v-else-if="type == 'enum'" class="d-flex gap-2">
            <span class="badge badge-light" v-for="(item, index) in data" :key="index">{{
              item[displayName]
            }}</span>
          </div>
          <div v-else-if="type === 'file'">
            <a v-if="data && data.fileName" :href="data.url" target="_blank">{{ data.fileName }}</a>
          </div>

          <div v-else-if="['dateTime', 'modifiedAt', 'createdAt'].includes(type!)">
            <span v-if="data"> {{ filters.FormatDateTime(data) }} </span>
          </div>

          <div v-else-if="type === 'time'">
            <span v-if="data"> {{ filters.FormatTime(data) }} </span>
          </div>

          <div v-else-if="type === 'date'">
            <span v-if="data"> {{ filters.FormatDate(data) }} </span>
          </div>

          <div v-else>{{ data ? data : '--' }}</div>
        </div>
        <div class="fw-bold fs-6" v-else>--</div>
      </div>
    </div>
  </div>
</template>
  
  <script setup lang="ts">
import filters from '@/core/helpers/filters'
const props = defineProps({
  label: String,
  data: [Object, String, Number, Boolean] as any,
  type: String,
  displayName: String
})
</script>
  