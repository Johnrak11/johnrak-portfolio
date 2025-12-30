<script setup lang="ts">
import { computed } from "vue"
import { cn } from "@/lib/utils"

type Variant = "default" | "secondary" | "outline"
const props = withDefaults(defineProps<{ variant?: Variant; class?: string }>(), {
  variant: "default"
})

const klass = computed(() => {
  const base = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors"
  const v =
    props.variant === "secondary"
      ? "border-transparent bg-secondary text-secondary-foreground"
      : props.variant === "outline"
        ? "text-foreground"
        : "border-transparent bg-primary text-primary-foreground"
  return cn(base, v, props.class)
})
</script>

<template>
  <span :class="klass"><slot /></span>
</template>
