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
            class="my-4 px-5 w-fit text-lg"
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
        <NuxtImg :src="imageSrc" v-if="imageSrc" class="rounded-2xl aspect-square w-full object-cover object-center"/>
        <div class="py-4 flex flex-col gap-4 mt-3 px-2 w-full">
          <div class="p-2 border-gray-600 border-2 w-full rounded-full">
            <h2 class="text-lg text-center font-bold text-white">Sebuah Penyakit</h2>
          </div>
          <div class="p-2 border-gray-600 border-2 w-full rounded-xl">
            <h3 class="text-2xl text-center font-bold text-white">Perawatan</h3>
            <p class="text-white p-5">
              ...
            </p>
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

//@ts-ignore
const imageSrc = useState(() => "")

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
</script>

<style></style>
