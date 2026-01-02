<script setup lang="ts">
import type { Profile } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

defineProps<{ profile: Profile }>()
</script>

<template>
  <section id="about" class="py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both">
    <div class="flex items-end justify-between gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">About</h2>
      <div class="text-xs text-muted-foreground">Data source: JSON</div>
    </div>

    <Separator class="my-4" />

    <div class="grid gap-4 md:grid-cols-2">
      <Card>
        <CardContent class="p-6">
          <h3 class="mb-2 font-medium">Summary</h3>
          <p class="text-sm text-muted-foreground">
            {{ profile.basics.summary }}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6">
          <h3 class="mb-2 font-medium">Links</h3>
          <div class="flex flex-wrap gap-2">
            <a
              v-for="l in profile.basics.links"
              :key="l.url"
              class="rounded-full border px-3 py-1 text-sm hover:bg-muted"
              :href="l.url"
              target="_blank"
              rel="noreferrer"
            >
              {{ l.label }}
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
