<template>
  <div class="px-4 py-5 pb-20">
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
          <img src="/images/grasshopper.png" height="250" format="webp" />
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
    <div
      v-if="imageSrc"
      class="flex w-full flex-col items-center justify-center"
    >
      <div
        class="mt-5 flex min-h-32 w-full flex-col items-center justify-center md:max-w-2xl"
      >
        <div class="relative w-full overflow-hidden rounded-2xl md:min-h-72">
          <div class="absolute right-0 top-0 z-10 m-2 space-x-2">
            <Button
              icon="pi pi-refresh"
              label="Ulangi"
              size="small"
              severity="contrast"
              class=""
              rounded
              raised
              @click="takePicture"
            />
          </div>
          <img
            :src="imageSrc"
            v-if="imageSrc"
            class="h-52 w-full object-cover object-center md:h-72"
          />
          <div class="flex w-full items-center bg-primary">
            <h2
              class="w-full py-2 text-center text-xl font-bold text-white"
              v-if="diseaseLabel"
            >
              {{ diseaseLabel }} {{ confidence }}
            </h2>
            <h2
              class="w-full py-2 text-center text-xl font-bold text-white"
              v-else
            >
              Harap tunggu...
            </h2>
          </div>
        </div>
        <div class="mt-3 flex w-full flex-col gap-4 py-4">
          <h3 class="text-center text-2xl font-bold text-white">Perawatan</h3>
          <div class="hud w-full p-2 py-5">
            <ScrollPanel style="width: 100%; height: 30dvh">
              <div
                class="recom px-3 text-justify text-sm text-white md:text-lg"
                v-if="diseaseContent"
                v-html="diseaseContent"
              ></div>
              <div class="w-full" v-else>
                <div class="flex flex-col gap-2">
                  <Skeleton
                    height="1.5rem"
                    v-for="item in Array.from({ length: 6 })"
                  />
                </div>
              </div>
              <ScrollTop />
            </ScrollPanel>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {PredictionResponse} from "~/types/scan"
import { Camera, CameraResultType } from "@capacitor/camera"

//@ts-ignore
definePageMeta({
  layout: "dashboard",
  auth: false,
})

interface RecommendationResponse {
  recommendation: Recommendation
}

interface Recommendation {
  content: string
}

const imageSrc = useState(() => "")
const diseaseLabel = useState(() => "")
const confidence = useState(() => "")
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
  diseaseLabel.value = ""
  confidence.value = ""
  diseaseContent.value = ""

  const config = useRuntimeConfig()

  const blob = await fetch(value).then((res) => res.blob())

  const formData = new FormData()

  formData.append("file", blob)

  await $fetch(config.public.scanApiUrl, {
    method: "POST",
    body: formData,
  })
    .then((res: PredictionResponse) => {
      diseaseLabel.value = res.class
      confidence.value = `(${Number(res.confidence.toFixed(2)) * 100}%)`
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
  const { onResult, onError } = useQuery<RecommendationResponse>(
    query,
    variables,
  )

  console.log(diseaseLabel.value, confidence.value)

  onResult((result) => {
    diseaseContent.value = result.data?.recommendation?.content ?? ""
  })

  onError((error) => {
    console.error(error)
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

ol {
  list-style-type: decimal;

  li {
    margin-left: 1rem;
    margin-bottom: 1rem;
  }
}
</style>
