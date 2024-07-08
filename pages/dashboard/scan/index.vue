<template>
  <div class="px-4 py-5 pb-32">
    <div class="w-full py-2">
      <h1 class="text-center text-xl font-bold text-white">
        {{ imageSrc ? "Hasil Scan" : "Scan Penyakit" }}
      </h1>
    </div>
    <div v-if="!imageSrc">
      <div
        class="mt-5 flex min-h-32 w-full flex-col items-center justify-center"
      >
        <div>
          <NuxtImg src="/images/grasshopper.png" height="250" format="webp" />
        </div>
        <div class="flex flex-col items-center gap-4">
          <p class="text-center text-3xl font-bold text-white">
            Temukan penyakitnya!
          </p>
          <p class="text-center text-gray-300">
            Ambillah gambar tanaman anda yang terindikasi berpenyakit dan
            ketahui perawatan yang tepat
          </p>
          <Button
            class="my-4 w-fit px-5 text-lg"
            icon="pi pi-camera"
            label="Ambil gambar"
            raised
            @click="takePicture"
          />
        </div>
      </div>
    </div>
    <div v-if="imageSrc">
      <div
        class="mt-5 flex min-h-32 w-full flex-col items-center justify-center"
      >
        <NuxtImg
          :src="imageSrc"
          v-if="imageSrc"
          class="aspect-square w-full rounded-2xl object-cover object-center"
        />
        <div class="mt-3 flex w-full flex-col gap-4 px-2 py-4">
          <div class="w-full rounded-full border-2 border-gray-600 p-2">
            <h2
              class="text-center text-lg font-bold text-white"
              v-if="diseaseLabel"
            >
              {{ diseaseLabel }}
            </h2>
          </div>
          <div class="w-full rounded-xl border-2 border-gray-600 p-2">
            <h3 class="text-center text-2xl font-bold text-white">Perawatan</h3>
            <div class="prose p-5 text-white text-justify" v-html="diseaseContent"></div>
          </div>
          <Button
            class="my-4 w-full text-lg"
            label="Ambil gambar lagi"
            raised
            @click="takePicture"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Camera, CameraResultType } from "@capacitor/camera"

//@ts-ignore
definePageMeta({
  layout: "dashboard",
})

interface RecommendationResponse {
  recommendation: Recommendation
}

interface Recommendation {
  content: string
}

const imageSrc = useState(() => "")
const diseaseLabel = useState(() => "")
const diseaseContent = useState(() => "")

const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri,
  }).then((image) => {
    return image
  })

  var imageUrl = image.webPath

  if (imageUrl) {
    imageSrc.value = imageUrl
  }
}

watch(imageSrc, async (value) => {
  const config = useRuntimeConfig()

  const blob = await fetch(value).then((res) => res.blob())

  const formData = new FormData()

  formData.append("file", blob)

  await $fetch(config.public.scanApiUrl, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      diseaseLabel.value = res.class
    })
    .catch((err) => {
      console.error(err)
    })

  const query = gql`
    query ($name: String!) {
      recommendation(name: $name) {
        content
      }
    }
  `
  const variables = { name: diseaseLabel.value }
  const { result } = useQuery<RecommendationResponse>(query, variables)

  console.log(result.value)

  diseaseContent.value = result.value?.recommendation.content ?? "N/A"
})
</script>

<style scoped>
prose ol {
  list-style-type: decimal;
  margin-right: 3rem;
}
</style>
