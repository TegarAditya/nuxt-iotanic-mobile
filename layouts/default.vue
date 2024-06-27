<template>
  <div class="w-full absolute overflow-hidden -z-10 h-screen bg-[#1D1B1F]">
    <div class="gradient-circle absolute opacity-65 top-5 -left-56 w-96 aspect-square" />
    <div class="gradient-circle absolute opacity-65 top-52 -right-56 w-96 aspect-square" />
    <div class="gradient-circle absolute opacity-65 -bottom-52 -left-56 w-96 aspect-square" />
  </div>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
.gradient-circle {
  border-radius: 330px;
  background: radial-gradient(50% 50% at 50% 50%, rgba(35, 62, 75, 0.50) 4%, rgba(36, 68, 78, 0.50) 25.5%, rgba(31, 40, 48, 0.50) 75.5%, rgba(29, 27, 31, 0.50) 100%);
}
</style>