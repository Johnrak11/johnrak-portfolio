<script setup lang="ts">
import { DropdownMenuTrigger } from "radix-vue"
defineProps<{ asChild?: boolean }>()
</script>

<template>
  <DropdownMenuTrigger :as-child="$props.asChild ?? false">
    <slot />
  </DropdownMenuTrigger>
</template>
