<template>
  <div class="flex h-screen w-full items-center p-10">
    <NuxtImg
      src="/images/logo.png"
      width="520"
      format="avif"
      alt="hero"
      layout="fill"
      objectFit="cover"
    />
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Iotanic",
  meta: [
    {
      name: "description",
      content: "Landing page.",
    },
  ],
})
setTimeout(() => {
  navigateTo("/auth/login");
}, 3000);
</script>

<style scoped></style>
