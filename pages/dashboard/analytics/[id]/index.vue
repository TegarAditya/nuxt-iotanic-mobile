<template>
  <div class="px-4 py-5 pb-10">
    <nav class="grid w-full grid-cols-4 items-center py-5">
      <div class="flex w-full justify-start">
        <Button
          icon="pi pi-angle-left"
          class="self-center text-lg"
          style="background: transparent"
          aria-label="Submit"
          severity="secondary"
          @click="$router.back"
          raised
        />
      </div>
      <h1 class="col-span-2 w-full text-center text-xl font-bold text-white">
        Sawah {{ id }}
      </h1>
      <div class="flex w-full justify-end">
        <Button
          icon="pi pi-bars"
          class="self-center text-lg"
          style="background: transparent"
          aria-label="Submit"
          severity="secondary"
          raised
        />
      </div>
    </nav>
    <ScrollPanel
      style="height: 75dvh"
      :pt="scrollPanelOptions"
      class="overflow-hidden rounded-md"
    >
      <div class="flex flex-col gap-4">
        <div class="hud h-fit w-full rounded-lg border-2 border-gray-300 p-5">
          <div v-if="weather">
            <div class="flex w-full items-start justify-between">
              <div class="flex max-w-[70%] flex-col gap-2">
                <div class="flex gap-2">
                  <p class="items-center text-3xl font-bold text-white">
                    {{ weather.temperature2m.toFixed(2) }}° C
                  </p>
                </div>
                <p class="text-sm font-semibold text-white">
                  {{ weather.weatherDescription }}
                </p>
                <p class="text-sm text-gray-300">
                  {{ date }}
                </p>
              </div>
              <div>
                <img src="/images/cloudy.png" height="100" format="webp" />
              </div>
            </div>
            <br class="py-4" />
            <div class="flex gap-2">
              <i class="pi pi-map-marker text-white"></i>
              <p class="text-sm text-white">{{ weather.address }}</p>
            </div>
          </div>
          <div v-else>
            <div class="flex justify-between">
              <div class="flex flex-col gap-3">
                <Skeleton width="10rem" height="3rem"></Skeleton>
                <Skeleton height="1rem"></Skeleton>
              </div>
              <Skeleton size="6rem" class="mr-2"></Skeleton>
            </div>
          </div>
        </div>
        <!--MAP-->
        <div
          class="hud overflow-hidden rounded-2xl border-2 border-gray-300 p-3"
        >
          <div class="w-full">
            <LMap
              style="height: 15rem"
              :zoom="zoom"
              :center="[-7.562922, 110.835633]"
              :use-global-leaflet="false"
            >
              <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&amp;copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                layer-type="base"
                name="OpenStreetMap"
              />
              <LMarker :lat-lng="[-7.562922, 110.835633]">
                <LPopup>{{ weather?.address }}</LPopup>
              </LMarker>
              <LControlScale
                position="topright"
                :imperial="false"
                :metric="true"
              />
            </LMap>
          </div>
        </div>
        <!-- ENDMAP -->

        <!-- BUTTON APP -->
        <div>
          <Button class="w-full" raised @click="navigateToPlantMonitoring">Monitoring Padi</Button>
        </div>
        <!-- END BUTTON APP -->
      </div>
    </ScrollPanel>
  </div>
</template>

<script lang="ts" setup>
import type { CurrentWeather, WeatherData } from "~/types/weather"
import type { PassThrough } from "primevue/ts-helpers"
import type { ScrollPanelPassThroughOptions } from "primevue/scrollpanel"

definePageMeta({
  layout: "dashboard",
})

const route = useRoute()

const zoom = ref(16)

const id = ref(route.params.id)
const latitude = ref(0)
const longitude = ref(0)
const weather: Ref<CurrentWeather | null> = ref(null)
const date = ref("")

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "Asia/Jakarta",
}

const scrollPanelOptions: PassThrough<ScrollPanelPassThroughOptions> = {
  wrapper: {
    style: { "border-right": "none" },
  },
  barY: "hidden",
}

async function navigateToPlantMonitoring() {
  await navigateTo(`/dashboard/analytics/${id.value}/padi-c64`)
}

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
    fetchWeatherData(latitude.value, longitude.value)
      .then((data) => {
        weather.value = data.current
        date.value = new Intl.DateTimeFormat("id-ID", dateOptions).format(
          data.current.time,
        )
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error)
      })
  })
})
</script>

<style>
.hud {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);
}
</style>
