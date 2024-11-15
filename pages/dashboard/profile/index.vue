<template>
  <div class="flex min-h-screen w-full flex-col items-center py-5">
    <div class="w-full max-w-xl py-2">
      <h1 class="text-center text-xl font-bold text-white">Profil</h1>
    </div>
    <div class="flex w-full justify-center">
      <div class="w-full max-w-lg self-center">
        <div
          class="reduced-opacity mt-10 flex h-auto flex-col rounded-xl bg-white py-5 pb-10"
        >
          <div class="relative z-10 -mt-10 self-center">
            <Avatar
              image="https://imgx.parapuan.co/crop/0x0:0x0/x/photo/2024/01/18/avatar-the-last-airbenderjpg-20240118123533.jpg"
              class="mr-2 rounded-full border-2 border-gray-300 object-cover"
              size="xlarge"
              shape="circle"
              style="width: 104px; height: 104px"
            />
          </div>
          <div class="mt-5">
            <div class="flex flex-col gap-3 px-4">
              <Button
                label="Informasi Pribadi"
                outlined
                class="flex h-12 w-full items-center justify-between rounded-xl px-4 text-white"
                ><span>Informasi Pribadi</span>
                <i class="pi pi-angle-right ml-2 text-green-800"></i>
              </Button>
              <Button
                label="Ubah Password"
                outlined
                class="flex h-12 w-full items-center justify-between rounded-xl px-4 text-white"
                ><span>Ubah Password</span>
                <i class="pi pi-angle-right ml-2 text-green-800"></i>
              </Button>
              <Button
                label="Tentang"
                outlined
                class="flex h-12 w-full items-center justify-between rounded-xl px-4 text-white"
              >
                <span>Tentang</span>
                <i class="pi pi-angle-right ml-2 text-green-800"></i
              ></Button>
            </div>
            <div class="mt-10 flex flex-col px-4">
              <Button
                label="Keluar"
                severity="danger"
                class="flex h-12 w-full items-center justify-between rounded-xl px-4 text-white"
                @click="redirectLogin"
              >
                <span>Keluar</span>
                <i class="pi pi-sign-out ml-2"></i
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
})

async function redirectLogin() {
  await navigateTo("/auth/login")
}
</script>

<style>
.reduced-opacity {
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 3rem;
}
</style>
