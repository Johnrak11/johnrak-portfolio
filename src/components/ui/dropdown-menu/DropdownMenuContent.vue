<script setup lang="ts">
import { DropdownMenuContent, DropdownMenuPortal } from "radix-vue"
import { cn } from "@/lib/utils"

withDefaults(
  defineProps<{
    align?: "start" | "center" | "end"
    sideOffset?: number
    class?: string
  }>(),
  { align: "end", sideOffset: 8 }
)
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :align="$props.align"
      :side-offset="$props.sideOffset"
      :class="cn('z-50 min-w-[10rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', $props.class)"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
