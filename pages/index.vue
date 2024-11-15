<template>
  <div class="flex h-screen w-full items-center justify-center p-10">
    <img
      src="/images/logo.png"
      alt="hero"
      layout="fill"
      objectFit="cover"
      class="md:max-w-lg"
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
