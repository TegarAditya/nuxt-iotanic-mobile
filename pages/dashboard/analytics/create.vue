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
          @click="$router.back()"
          raised
        />
      </div>
      <h1 class="col-span-2 w-full text-center text-xl font-bold text-white">
        Tambah Lahan
      </h1>
      <div class="flex w-full justify-end"></div>
    </nav>
    <form action="" @submit.prevent="submit">
      <ScrollPanel
        :pt="scrollPanelOptions"
        style="height: 65dvh"
        class="overflow-hidden rounded-md"
      >
        <Card>
          <template #content>
            <div class="text-white">
              <div class="flex flex-col gap-2">
                <label for="name" class="mt-2">Nama Lahan</label>
                <InputText id="name" v-model="name" size="large" required />
              </div>
              <div class="flex flex-col gap-2">
                <label for="address" class="mt-2">Alamat Lahan</label>
                <Textarea
                  id="address"
                  autoResize
                  rows="5"
                  v-model="address"
                  size="large"
                  required
                />
              </div>
              <div class="mt-5 flex flex-col gap-2">
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
                        <LPopup
                          >Jl. Jend. Urip Sumoharjo No.116, Purwodiningratan,
                          Kec. Jebres, Kota Surakarta, Jawa Tengah 57129</LPopup
                        >
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
              </div>
              <div class="flex flex-col gap-2">
                <label for="area" class="mt-2">Luas</label>
                <InputText id="area" v-model="area" size="large" required />
              </div>
              <div class="flex flex-col gap-2">
                <label for="plant" class="mt-2">Jenis Tanaman</label>
                <Dropdown
                  v-model="plant"
                  :options="plants"
                  optionLabel="name"
                  placeholder="Pilih Jenis Tanaman"
                  checkmark
                  :highlightOnSelect="false"
                  class="w-full"
                />
              </div>
              <div class="flex flex-col gap-2">
                <label for="status" class="mt-2">Status Lahan</label>
                <ToggleButton
                  id="status"
                  onLabel="Aktif"
                  offLabel="Tidak Aktif"
                  v-model="status"
                  class="h-12"
                  required
                />
              </div>
            </div>
          </template>
        </Card>
      </ScrollPanel>
      <div class="mx-5 mt-7 flex gap-2">
        <Button
          class="h-10 w-full text-lg"
          label="Kembali"
          severity="contrast"
          @click="$router.back"
        />
        <Button class="h-10 w-full text-lg" label="Simpan" type="submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { customAlphabet } from "nanoid"

import type { PassThrough } from "primevue/ts-helpers"
import type { ScrollPanelPassThroughOptions } from "primevue/scrollpanel"
import type { Land } from "~/types/land"

definePageMeta({
  layout: "dashboard",
})

interface Plant {
  name: string
}

const router = useRouter()

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  15,
)

const zoom = 15

const plants: Plant[] = [
  { name: "Padi - C64" },
]

const id = ref(nanoid())
const name = ref("Sawah Mesen")
const address = ref(
  "Jl. Jend. Urip Sumoharjo No.116, Purwodiningratan, Kec. Jebres, Kota Surakarta, Jawa Tengah 57129",
)
const latitude = ref("-7.562922")
const longitude = ref("110.835633")
const plant = ref("")
const area = ref("120m2")
const status = ref(true)
const createdAt = ref(new Date().toISOString())
const updatedAt = ref(new Date().toISOString())

const formData = computed(() => {
  return {
    id: id.value,
    name: name.value,
    address: address.value,
    latitude: latitude.value,
    longitude: longitude.value,
    plant: plant.value,
    area: area.value,
    status: status.value,
    createdAt: createdAt.value,
    updatedAt: updatedAt.value,
  }
})

const scrollPanelOptions: PassThrough<ScrollPanelPassThroughOptions> = {
  wrapper: {
    style: { "border-right": "none" },
  },
  barY: "hidden",
}

function submit() {
  console.log(formData.value)
}
</script>
