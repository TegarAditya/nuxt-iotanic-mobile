<template>
  <div class="px-4 py-5 pb-32">
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
    <div>
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
              <p class="text-sm text-gray-300">{{ new Intl.DateTimeFormat('id-ID', dateOptions).format(weather.time) }}</p>
            </div>
            <div>
              <NuxtImg src="/images/cloudy.png" height="100" format="webp" />
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
      <div class="w-full flex-col my-3">
        <Button class="w-full py-3" severity="secondary" raised>Varietas Padi</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CurrentWeather, WeatherData } from "~/types/weather"

definePageMeta({
  layout: "dashboard",
})

const route = useRoute()

const id = ref(route.params.id)
const latitude = ref(0)
const longitude = ref(0)
const weather: Ref<CurrentWeather | null> = ref(null)
const toggle = ref(false)
const placeholderArray = Array.from({ length: 4 })

const dateOptions: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  timeZone: 'Asia/Jakarta',
};

onMounted(() => {
  navigator.geolocation.getCurrentPosition((position) => {
    latitude.value = position.coords.latitude
    longitude.value = position.coords.longitude
    fetchWeatherData(latitude.value, longitude.value)
      .then((data) => {
        weather.value = data.current
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
