<template>
  <Button
    v-if="provider === 'google'"
    class="w-full font-extrabold text-white"
    outlined
    size="large"
    icon="pi pi-google"
  />
  <Button
    v-else-if="provider === 'facebook'"
    class="w-full font-extrabold text-white"
    outlined
    size="large"
    icon="pi pi-facebook"
  />
  <Button v-else class="w-full font-extrabold text-white" outlined size="large"
    >Social</Button
  >
</template>

<script lang="ts" setup>
interface SocialAuthButtonProps {
  provider: "google" | "facebook"
}

defineProps({
  provider: String as PropType<SocialAuthButtonProps["provider"]>,
})
</script>
