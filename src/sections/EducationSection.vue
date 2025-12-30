<script setup lang="ts">
import type { Profile } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

defineProps<{ profile: Profile }>()
</script>

<template>
  <section id="education" class="py-10">
    <h2 class="text-2xl font-semibold tracking-tight">Education</h2>
    <Separator class="my-4" />

    <div class="relative ml-3 border-l pb-10">
      <div 
        v-for="edu in profile.education" 
        :key="edu.school" 
        class="relative pl-8 pb-8 last:pb-0"
      >
        <!-- Timeline Dot -->
        <span class="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full border bg-muted-foreground ring-4 ring-background"></span>

        <Card>
          <CardContent class="p-6">
            <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div class="text-lg font-semibold">
                  <a v-if="edu.url" :href="edu.url" target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {{ edu.school }}
                  </a>
                  <span v-else>{{ edu.school }}</span>
                </div>
                <div class="text-sm text-muted-foreground">
                  {{ edu.degree }}
                </div>
              </div>
              <Badge variant="secondary">
                {{ edu.start }} → {{ edu.end ?? "Present" }}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
