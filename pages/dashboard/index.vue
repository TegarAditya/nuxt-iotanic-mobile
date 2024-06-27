<template>
  <div class="px-4">
    <div class="header flex items-center justify-between pt-5">
      <p class="text-xl font-bold text-white">Rara</p>
      <Button
        icon="pi pi-bell"
        class="text-lg"
        style="background: transparent"
        aria-label="Submit"
        severity="secondary"
        raised
        @click="refreshWeather"
      />
    </div>
    <div class="hud mt-5 h-fit w-full rounded-lg border-2 border-gray-300 p-5">
      <div v-if="weather">
        <div class="flex w-full items-center justify-between">
          <div class="flex max-w-[70%] flex-col gap-2">
            <div class="flex gap-2">
              <p class="items-center text-3xl font-bold text-white">
                {{ weather.temperature2m.toFixed(2) }}° C
              </p>
              <Button
                icon="pi pi-refresh"
                style="background: transparent"
                aria-label="Submit"
                severity="secondary"
                text
                rounded
                @click="refreshWeather"
              />
            </div>
            <p class="text-sm font-semibold text-white">
              {{ weather.weatherDescription }}
            </p>
            <p class="text-sm text-gray-400">{{ weather.address }}</p>
          </div>
          <div>
            <NuxtImg src="/images/cloudy.png" height="100" format="webp" />
          </div>
        </div>
        <Divider />
        <div class="flex w-full items-center justify-between">
          <div class="flex flex-col">
            <p class="text-sm text-gray-400">Suhu</p>
            <p class="text-lg font-bold text-white">
              {{ weather.temperature2m.toFixed(0) }}° C
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-sm text-gray-400">Kelembapan</p>
            <p class="text-lg font-bold text-white">
              {{ weather.relativeHumidity2m }}%
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-sm text-gray-400">Windspeed</p>
            <p class="text-lg font-bold text-white">
              {{ weather.windSpeed10m.toFixed(2) }}
              <span class="text-sm font-normal">Km/h</span>
            </p>
          </div>
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
        <Divider />
        <div>
          <div class="flex justify-between">
            <div class="flex flex-col gap-2">
              <Skeleton width="5rem"></Skeleton>
              <Skeleton width="5rem" height="1.5rem"></Skeleton>
            </div>
            <div class="flex flex-col gap-2">
              <Skeleton width="5rem"></Skeleton>
              <Skeleton width="5rem" height="1.5rem"></Skeleton>
            </div>
            <div class="flex flex-col gap-2">
              <Skeleton width="5rem"></Skeleton>
              <Skeleton width="5rem" height="1.5rem"></Skeleton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pt-7">
      <p class="font-bold text-white">Pengukuran terbaru</p>
    </div>
    <div>
      <div class="mt-5 grid grid-cols-2 gap-5">
        <div
          v-for="(item, index) in placeholderArray"
          class="card hud flex aspect-square h-full flex-col justify-between rounded-lg border-2 border-gray-500 p-3"
        >
          <div class="flex items-center justify-between">
            <NuxtImg src="/images/plant-icon.png" height="20" class="h-fit" />
            <QToggle v-model="toggle" />
          </div>
          <div>
            <p class="text-sm font-bold text-white">Sawah {{ index }}</p>
            <p class="text-xs text-gray-400">1 Varietas</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
})

const latitude = ref(0)
const longitude = ref(0)
const weather = ref()
const toggle = ref(false)
const placeholderArray = Array.from({ length: 4 })

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

const refreshWeather = () => {
  fetchWeatherData(latitude.value, longitude.value)
    .then((data) => {
      weather.value = data.current
    })
    .catch((error) => {
      console.error("Error refreshing weather data:", error)
    })
}
</script>

<style scoped>
.hud {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);
}
</style>
