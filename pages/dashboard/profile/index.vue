<template>
  <div class="min-h-screen justify-center py-5 pb-32">
    <div class="w-full py-2">
      <h1 class="text-center text-xl font-bold text-white">Profil</h1>
    </div>
    <div class="absolute bottom-0 z-10 w-full">
      <div
        class="reduced-opacity mt-10 flex h-[70dvh] flex-col rounded-3xl bg-white"
      >
        <div class="-mt-7 self-center">
          <Avatar
            image="https://imgx.parapuan.co/crop/0x0:0x0/x/photo/2024/01/18/avatar-the-last-airbenderjpg-20240118123533.jpg"
            class="mr-2"
            size="xlarge"
            shape="circle"
          />
        </div>
        <div>
          <div class="flex flex-col gap-3 px-4">
            <Button label="Informasi Pribadi" outlined />
            <Button label="Ubah Password" outlined />
            <Button label="Tentang" outlined />
            <Button label="Keluar" severity="danger" outlined @click="navigateTo('/auth/login')"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
//@ts-ignore
definePageMeta({
  layout: "dashboard",
})
</script>

<style>
.reduced-opacity {
  background-color: rgba(255, 255, 255, 0.05);
}
</style>