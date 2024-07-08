<template>
  <div class="fixed -z-10 min-h-screen w-full overflow-hidden bg-[#1D1B1F]">
    <div
      class="gradient-circle absolute -left-56 top-5 aspect-square w-96 opacity-65"
    />
    <div
      class="gradient-circle absolute -right-56 top-52 aspect-square w-96 opacity-65"
    />
    <div
      class="gradient-circle absolute -bottom-52 -left-56 aspect-square w-96 opacity-65"
    />
  </div>
  <div>
    <slot />
  </div>
</template>

<script lang="ts" setup></script>

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
</style>
