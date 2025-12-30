<script setup lang="ts">
import { computed } from "vue"
import { Primitive } from "radix-vue"
import { cn } from "@/lib/utils"
import { buttonVariants, type ButtonVariants } from "./types"

type Props = {
  asChild?: boolean
  as?: string
  variant?: ButtonVariants["variant"]
  size?: ButtonVariants["size"]
}

const props = withDefaults(defineProps<Props>(), {
  asChild: false,
  as: "button",
  variant: "default",
  size: "default"
})

const classes = computed(() => cn(buttonVariants({ variant: props.variant, size: props.size })))
</script>

<template>
  <Primitive :as="asChild ? 'span' : as" :as-child="asChild" :class="classes">
    <slot />
  </Primitive>
</template>
