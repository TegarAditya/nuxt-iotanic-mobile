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
        Sawah {{ id }} - Padi
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
      <div class="my-5">
        <Card class="mx-auto w-fit">
          <template #content>
            <div class="flex w-full flex-col items-center gap-3">
              <QRCode :value="QRValue" />
              <Button
                label="Print Kode"
                class="w-full"
                rounded
                outlined
                severity="secondary"
              ></Button>
            </div>
          </template>
        </Card>
      </div>
      <div class="mx-5">
        <div class="flex justify-between">
          <Button label="Vegetatif" severity="contrast" rounded />
          <Button label="Generatif" severity="contrast" rounded outlined />
          <Button label="Pematangan" severity="contrast" rounded outlined />
        </div>
        <Card class="mt-5">
          <template #title>Hasil Pengukuran</template>
          <template #content>
            <DataTable :value="records" tableStyle="min-width: 10rem">
              <Column field="date" header="Tanggal"></Column>
              <Column field="N" header="N"></Column>
              <Column field="P" header="P"></Column>
              <Column field="K" header="K"></Column>
              <Column field="Ph" header="Ph"></Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </ScrollPanel>
  </div>
</template>

<script lang="ts" setup>
import type { PassThrough } from "primevue/ts-helpers"
import type { ScrollPanelPassThroughOptions } from "primevue/scrollpanel"

definePageMeta({
  layout: "dashboard",
})

interface Record {
  date: string
  N: number
  P: number
  K: number
  Ph: number
}

const route = useRoute()

const id = ref(route.params.id)

const QRData = {
  land: "Land 5",
  variety: "Variety 1",
  measurement_id: "D1oGsaYIBkxuSI9",
}

const periods = [
  {
    label: "Vegetatif",
  },
  {
    label: "Generatif",
  },
  {
    label: "Pematangan",
  },
]

const records: Record[] = [
  {
    date: "2021-10-10",
    N: 10,
    P: 20,
    K: 30,
    Ph: 40,
  },
  {
    date: "2021-10-11",
    N: 10,
    P: 20,
    K: 30,
    Ph: 7,
  },
  {
    date: "2021-10-12",
    N: 10,
    P: 20,
    K: 30,
    Ph: 7,
  },
  {
    date: "2021-10-13",
    N: 10,
    P: 20,
    K: 30,
    Ph: 8,
  },
  {
    date: "2021-10-14",
    N: 10,
    P: 20,
    K: 30,
    Ph: 7.5,
  },
  {
    date: "2021-10-15",
    N: 10,
    P: 20,
    K: 30,
    Ph: 6.7,
  },
]

const QRValue = JSON.stringify(QRData)

const scrollPanelOptions: PassThrough<ScrollPanelPassThroughOptions> = {
  wrapper: {
    style: { "border-right": "none" },
  },
  barY: "hidden",
}
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
