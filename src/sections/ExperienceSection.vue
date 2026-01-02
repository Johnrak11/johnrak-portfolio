<script setup lang="ts">
import type { Profile } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

defineProps<{ profile: Profile }>()
</script>

<template>
  <section id="experience" class="py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both">
    <h2 class="text-2xl font-semibold tracking-tight">Experience</h2>
    <Separator class="my-4" />

    <div class="relative ml-3 border-l-2 border-border/50 pb-10 space-y-8">
      <div 
        v-for="job in profile.experience" 
        :key="job.company + job.start" 
        class="relative pl-8 sm:pl-10"
      >
        <!-- Timeline Dot -->
        <span class="absolute -left-[9px] top-6 h-4 w-4 rounded-full border-4 border-background bg-primary shadow-sm"></span>

        <Card class="group transition-all duration-300 hover:shadow-lg hover:border-primary/50">
          <CardContent class="p-5 sm:p-6">
            <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between mb-4">
              <div class="space-y-1">
                <div class="text-lg font-bold group-hover:text-primary transition-colors">
                  <a v-if="job.url" :href="job.url" target="_blank" rel="noopener noreferrer" class="hover:underline flex items-center gap-2">
                    {{ job.title }}
                  </a>
                  <span v-else>{{ job.title }}</span>
                </div>
                <div class="text-sm font-medium text-muted-foreground flex items-center flex-wrap gap-2">
                  <span class="text-foreground">{{ job.company }}</span>
                   <span v-if="job.location" class="hidden sm:inline">•</span>
                   <span v-if="job.location" class="text-xs sm:text-sm bg-muted px-2 py-0.5 rounded-full">{{ job.location }}</span>
                </div>
              </div>
              <Badge variant="secondary" class="w-fit shrink-0 font-mono text-xs">
                {{ job.start }} — {{ job.end ?? "Present" }}
              </Badge>
            </div>

            <ul class="space-y-2">
              <li v-for="b in job.bullets" :key="b" class="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                <span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50"></span>
                <span>{{ b }}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
