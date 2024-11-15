<template>
  <div class="relative w-full h-72">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { Line } from "vue-chartjs"
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
} from "chart.js"

// Mendaftarkan elemen-elemen yang dibutuhkan oleh Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
)

// Mendefinisikan chartData
const chartData = ref({
  labels: [
    "2021-10-10",
    "2021-10-11",
    "2021-10-12",
    "2021-10-13",
    "2021-10-14",
    "2021-10-15",
  ],
  datasets: [
    {
      label: "N",
      data: [10, 10, 10, 10, 10, 10],
      borderColor: "#42A5F5",
      backgroundColor: "rgba(66, 165, 245, 0.2)",
      fill: true,
    },
    {
      label: "P",
      data: [20, 20, 20, 20, 20, 20],
      borderColor: "#66BB6A",
      backgroundColor: "rgba(102, 187, 106, 0.2)",
      fill: true,
    },
    {
      label: "K",
      data: [30, 30, 30, 30, 30, 30],
      borderColor: "#FFA726",
      backgroundColor: "rgba(255, 167, 38, 0.2)",
      fill: true,
    },
    {
      label: "Ph",
      data: [40, 7, 7, 8, 7.5, 6.7],
      borderColor: "#AB47BC",
      backgroundColor: "rgba(171, 71, 188, 0.2)",
      fill: true,
    },
  ],
})

// Mendefinisikan chartOptions
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
})
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  max-height: 400px;
}
</style>
