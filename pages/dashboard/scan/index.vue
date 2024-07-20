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
    <div v-if="imageSrc">
      <div
        class="mt-5 flex min-h-32 w-full flex-col items-center justify-center"
      >
        <div class="relative w-full overflow-hidden rounded-2xl">
          <div class="absolute right-0 top-0 z-10 m-2">
            <Button
              icon="pi pi-refresh"
              icon-pos="right"
              size="small"
              severity="secondary"
              class=""
              rounded
              raised
              @click="takePicture"
            />
          </div>
          <img
            :src="imageSrc"
            v-if="imageSrc"
            class="h-52 w-full object-cover object-center"
          />
          <div class="flex w-full items-center bg-primary">
            <h2
              class="w-full py-2 text-center text-xl font-bold text-white"
              v-if="diseaseLabel"
            >
              {{ diseaseLabel }}
            </h2>
          </div>
        </div>
        <div class="mt-3 flex w-full flex-col gap-4 py-4">
          <h3 class="text-center text-2xl font-bold text-white">Perawatan</h3>
          <div class="w-full p-2">
            <ScrollPanel style="width: 100%; height: 30dvh">
              <div class="recom px-3 text-justify text-white">
                <ol>
                  <li>
                    Pastikan sistem irigasi dan drainase dalam kondisi baik
                    untuk menghindari kontaminasi silang dan penyebaran
                    bakteri&nbsp;
                  </li>
                  <li>
                    Ganti penggunaan pupuk kimia dengan pupuk organik seperti
                    kompos atau pupuk kandang untuk memperbaiki kondisi tanah
                    dan meningkatkan populasi mikroorganisme baik
                  </li>
                  <li>
                    Lakukan penyemprotan dengan fungisida yang mengandung
                    <em>azoxystrobin</em>, <em>propiconazole</em>, atau
                    <em>hexaconazole</em> sesuai dosis anjuran pada waktu yang
                    tepat&nbsp;
                  </li>
                  <li>
                    Gunakan agen hayati seperti <em>Trichoderma spp.</em> dan
                    <em>Pseudomonas fluorescens</em> yang dapat mengurangi
                    populasi patogen secara alami &nbsp;
                  </li>
                  <li>
                    Pangkas dan bakar tanaman yang terinfeksi untuk mencegah
                    penyebaran lebih lanjut&nbsp;
                  </li>
                  <li>
                    Pertimbangkan menanam tanaman penutup tanah atau tanaman
                    lain selain padi dalam rotasi tanaman untuk mengurangi
                    populasi bakteri di tanah
                  </li>
                </ol>
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
const diseaseLabel = useState(() => "Sheath Blight")
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
      diseaseLabel.value = `${res.class} (${res.confidence.toFixed(2) * 100}%)`
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

  console.log(result.value, diseaseLabel.value)

  diseaseContent.value = result.value?.recommendation?.content ?? ""
})
</script>

<style>
ol {
  list-style-type: decimal;
  
  li {
    margin-left: 1.5rem;
  }
}
</style>
