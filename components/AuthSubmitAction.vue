<template>
  <div>
    <Button
      class="w-full font-extrabold text-white"
      size="large"
      :outlined="outlined"
      :severity="severity"
    >
      <slot />
    </Button>
  </div>
</template>

<script lang="ts" setup>
import type { HintedString } from "primevue/ts-helpers"
import type { PropType } from "vue"

defineProps({
  outlined: Boolean,
  severity: String as PropType<
    | HintedString<
        | "secondary"
        | "success"
        | "info"
        | "warning"
        | "help"
        | "danger"
        | "contrast"
      >
    | undefined
  >,
})
</script>

<style></style>
