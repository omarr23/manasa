<template>
  <div
    id="kt_customer_details_invoices_1"
    class="py-0 tab-pane fade active show card-body pt-0"
    role="tabpanel"
  >
    <div class="search-box">
      <GMapAutocomplete placeholder="This is a placeholder" @place_changed="setPlace">
      </GMapAutocomplete>
    </div>
    <GoogleMap
      :api-promise="apiPromise"
      style="width: 100%; height: 500px"
      :center="coords"
      :zoom="15"
    >
      <Marker
        :options="{
          position: coords,
          zoomControl: true,
          clickable: true,
          draggable: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          disableDefaultUi: true
        }"
        :clickable="true"
        :draggable="true"
        @dragend="onClicked"
      />
    </GoogleMap>

    <!-- <GoogleMap
      api-key="AIzaSyCzNrsXxoP-5ShFs4EN3hAbD7rWzOc3G5Y"
      style="width: 100%; height: 500px"
      :center="coords"
      :zoom="10"
    >
      <Marker
        :options="{
          position: center,
          zoomControl: true,
          clickable: true,
          draggable: true,
          position: true,
          mapTypeControl: true,
          scaleControl: true,
          streetViewControl: true,
          rotateControl: true,
          fullscreenControl: true,
          disableDefaultUi: true
        }"
        :clickable="true"
        :draggable="true"
        @dragend="onClicked"
      >

      </Marker>
    </GoogleMap> -->

    <!-- <GMapMap
      ref="myMapRef"
      :center="coords"
      :zoom="10"
      map-type-id="terrain"
      style="height: 20rem"
      @click="onClicked"
      :options="{
        zoomControl: true,
        clickable: true,
        draggable: true,
        position: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        rotateControl: true,
        fullscreenControl: true,
        disableDefaultUi: true
      }"
    >
      <GMapMarker
        :key="markerDetails.id"
        :position="markerDetails.position"
        :clickable="true"
        :draggable="true"
        @dragend="onClicked"
      >
      </GMapMarker>
    </GMapMap> -->
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import filters from '@/core/helpers/filters.ts'
import { onMounted, ref, watch } from 'vue'

import { GoogleMap, Marker } from 'vue3-google-map'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: 'AIzaSyCzNrsXxoP-5ShFs4EN3hAbD7rWzOc3G5Y',
  version: 'weekly',
  libraries: ['places']
})

const apiPromise = loader.load()

const emit = defineEmits(['latLng'])

const coords = ref({ lat: 51.5072, lng: 0.1276 })
const heatData = ref([])
const myMapRef = ref()

const onClicked = (e: any) => {
  coords.value.lat = e.latLng.lat()
  coords.value.lng = e.latLng.lng()
  emit('latLng', coords.value)
}
// Marker Details
const markerDetails = ref({
  id: 1,
  position: coords.value
})
const openedMarkerID = ref(null)

// Places Details
const locationDetails = ref({
  address: '',
  url: ''
})

// Get users current location using the browser's geolocation API
const getUserLocation = () => {
  // Check if Geolocation is supported by the browser
  const isSupported = 'navigator' in window && 'geolocation' in navigator
  if (isSupported) {
    // Retrieve the user's current position
    navigator.geolocation.getCurrentPosition((position) => {
      coords.value.lat = position.coords.latitude
      coords.value.lng = position.coords.longitude
      emit('latLng', coords.value)
    })
  }
}

// Set the location based on the place selected
const setPlace = (place: any) => {
  coords.value.lat = place.geometry.location.lat()
  coords.value.lng = place.geometry.location.lng()
  emit('latLng', coords.value)
  // Update the location details
  locationDetails.value.address = place.formatted_address
  locationDetails.value.url = place.url
}

// Open the marker info window
const openMarker = (id: string) => {
  openedMarkerID.value = id
}
onMounted(() => {
  getUserLocation()
  emit('latLng', coords.value)
})
</script>

<style lang="scss" scoped>
.search-box {
  input {
    width: 100%;
    height: 30px;
    border: 1px solid #eee;
    border-radius: 5px;
    margin: 5px 0px;
  }
}
.vue-map {
  width: 100%;
}
</style>