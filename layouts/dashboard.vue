<template>
  <div class="fixed -z-10 min-h-screen w-full overflow-hidden bg-[#1D1B1F]">
    <CircleGradientAccent />
  </div>
  <div class="max-w-2xl mx-auto">
    <slot />
  </div>
  <div class="fixed bottom-0 z-30 h-24 w-full pt-2 px-4">
    <div class="navbar m-4 mt-0 grid h-16 grid-cols-4 gap-2 rounded-xl p-2 max-w-md mx-auto">
      <Button
        icon="pi pi-home"
        class="w-full text-2xl font-bold text-white"
        :text="!/^\/dashboard\/?$/.test($router.currentRoute.value.path)"
        severity="secondary"
        @click="$router.push('/dashboard')"
      />
      <Button
        icon="pi pi-th-large"
        class="w-full text-2xl font-bold text-white"
        :text="!/^\/dashboard\/analytics.*/.test($router.currentRoute.value.path)"
        severity="secondary"
        @click="$router.push('/dashboard/analytics')"
      />
      <Button
        icon="pi pi-camera"
        class="w-full text-2xl font-bold text-white"
        :text="!/^\/dashboard\/scan.*/.test($router.currentRoute.value.path)"
        severity="secondary"
        @click="$router.push('/dashboard/scan')"
      />
      <Button
        icon="pi pi-user"
        class="w-full text-2xl font-bold text-white"
        :text="!/^\/dashboard\/profile.*/.test($router.currentRoute.value.path)"
        severity="secondary"
        @click="$router.push('/dashboard/profile')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

useAuthStore().init()

</script>

<style>
.gradient-circle {
  border-radius: 330px;
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgba(35, 62, 75, 0.5) 4%,
    rgba(36, 68, 78, 0.5) 25.5%,
    rgba(31, 40, 48, 0.5) 75.5%,
    rgba(29, 27, 31, 0.5) 100%
  );
}

.navbar {
  background: rgb(23, 29, 35);
  background: linear-gradient(
    90deg,
    rgba(23, 29, 35, 1) 0%,
    rgba(20, 45, 75, 1) 100%
  );
}
</style>
