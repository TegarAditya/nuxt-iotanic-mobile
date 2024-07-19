<template>
  <div class="px-4 py-5 pb-32">
    <div class="grid w-full grid-cols-4 items-center py-5">
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
        Daftar Lahan
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
    </div>
    <div class="flex justify-center gap-2 pt-5">
      <Button
        class="w-full"
        label="Aktif"
        :severity="isActiveLandMenu ? 'contrast' : 'secondary'"
        @click="isActiveLandMenu = true"
        rounded
      />
      <Button
        class="w-full"
        label="Non Aktif"
        :severity="isActiveLandMenu ? 'secondary' : 'contrast'"
        @click="isActiveLandMenu = false"
        rounded
      />
    </div>

    <div class="mt-5 overflow-hidden rounded-lg shadow-inner">
      <ScrollPanel class="h-[62dvh]" :pt="scrollPanelOptions">
        <div class="grid gap-5">
          <div v-for="(item, index) in placeholderArray">
            <NuxtLink :to="`/dashboard/analytics/${index}`">
            <div
              class="card hud flex h-full justify-between rounded-lg border-gray-500 p-3"
            >
              <div class="flex flex-col gap-7">
                <div class="items-center justify-between">
                  <NuxtImg
                    src="/images/plant-icon.png"
                    height="20"
                    class="h-fit"
                  />
                </div>
                <div>
                  <p class="text-sm font-bold text-white">Sawah {{ index }}</p>
                  <p class="text-xs text-gray-400">1 Varietas</p>
                </div>
              </div>
              <div class="fl">
                <small class="rounded-full bg-primary px-2 text-white shadow-sm"
                  >aktif</small
                >
              </div>
            </div>
          </NuxtLink>
          </div>
        </div>
        <ScrollTop
          target="parent"
          :threshold="100"
          icon="pi pi-arrow-up"
          :pt="scrollTopOptions"
        />
      </ScrollPanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PassThrough } from "primevue/ts-helpers"
import type { ScrollPanelPassThroughOptions } from "primevue/scrollpanel"
import type { ScrollTopPassThroughOptions } from "primevue/scrolltop"

definePageMeta({
  layout: "dashboard",
})

const isActiveLandMenu = ref(true)

const placeholderArray = Array.from({ length: 10 })

const scrollPanelOptions: PassThrough<ScrollPanelPassThroughOptions> = {
  wrapper: {
    style: { "border-right": "none" },
  },
  barY: "hidden",
}

const scrollTopOptions: PassThrough<ScrollTopPassThroughOptions> = {
  severity: "contrast",
  raised: true,
  rounded: true,
}
</script>

<style scoped>
.hud {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(10.1px);
  -webkit-backdrop-filter: blur(10.1px);
}
</style>
