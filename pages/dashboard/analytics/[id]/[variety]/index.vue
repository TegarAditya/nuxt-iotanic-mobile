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
    </nav>
    <ScrollPanel
      style="height: 75dvh"
      :pt="scrollPanelOptions"
      class="overflow-hidden rounded-md"
    >
    <div class="lg:flex lg:justify-center lg:gap-5">
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
      <div>
        <div class="flex justify-center gap-4">
          <Button label="Vegetatif" severity="contrast" rounded />
          <Button label="Generatif" severity="contrast" rounded outlined />
          <!-- <Button label="Pematangan" severity="contrast" rounded outlined /> -->
        </div>

        <!-- Toggler Icon -->
        <Card class="mt-5 max-w-2xl">
          <template #title>
            <div class="flex items-center justify-between">
              <span>Hasil Pengukuran</span>
              <i
                class="pi pi-chart-line cursor-pointer"
                style="font-size: 1.2em; cursor: pointer"
                @click="toggleChart"
              ></i>
            </div>
          </template>
          <template #content>
            <!-- Display Table or Chart Based on showChart -->
            <div v-if="!showChart">
              <div class="overflow-x-auto">
                <DataTable :value="records" tableStyle="min-width: 10rem">
                  <Column field="date" header="Tanggal"></Column>
                  <Column field="N" header="N"></Column>
                  <Column field="P" header="P"></Column>
                  <Column field="K" header="K"></Column>
                  <Column field="Ph" header="Ph"></Column>
                </DataTable>
              </div>
            </div>

            <!-- Chart Display -->
            <div v-else>
              <div class="relative w-full max-w-full h-auto mt-5 -ml-2 max-h-96">
                <LineChart />
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>
    </ScrollPanel>
  </div>
</template>

<script lang="ts" setup>
// Toggle chart visibility
const showChart = ref(false)

const toggleChart = () => {
  showChart.value = !showChart.value
}

const scrollPanelOptions = {
  wrapper: {
    style: { "border-right": "none" },
  },
  barY: "hidden",
}

const route = useRoute()
const id = ref(route.params.id)

const QRData = {
  land: "Land 5",
  variety: "Variety 1",
  measurement_id: "D1oGsaYIBkxuSI9",
}

const records = [
  { date: "2021-10-10", N: 10, P: 20, K: 30, Ph: 40 },
  { date: "2021-10-11", N: 10, P: 20, K: 30, Ph: 7 },
  { date: "2021-10-12", N: 10, P: 20, K: 30, Ph: 7 },
  { date: "2021-10-13", N: 10, P: 20, K: 30, Ph: 8 },
  { date: "2021-10-14", N: 10, P: 20, K: 30, Ph: 7.5 },
  { date: "2021-10-15", N: 10, P: 20, K: 30, Ph: 6.7 },
]

const QRValue = JSON.stringify(QRData)
</script>
