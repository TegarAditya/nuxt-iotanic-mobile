<template>
  <div class="rounded-2xl overflow-hidden">
    <VueQrcode :value="$props.value" />
  </div>
</template>

<script lang="ts" setup>
import VueQrcode from "@chenfengyuan/vue-qrcode"

defineProps({
  value: {
    type: String,
    required: true,
  },
})
</script>

<style></style>
