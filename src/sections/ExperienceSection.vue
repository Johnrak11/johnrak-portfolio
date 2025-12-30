<script setup lang="ts">
import type { Profile } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

defineProps<{ profile: Profile }>()
</script>

<template>
  <section id="experience" class="py-10">
    <h2 class="text-2xl font-semibold tracking-tight">Experience</h2>
    <Separator class="my-4" />

    <div class="relative ml-3 border-l pb-10">
      <div 
        v-for="job in profile.experience" 
        :key="job.company + job.start" 
        class="relative pl-8 pb-8 last:pb-0"
      >
        <!-- Timeline Dot -->
        <span class="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full border bg-muted-foreground ring-4 ring-background"></span>

        <Card>
          <CardContent class="p-6">
            <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div>
                <div class="text-lg font-semibold">
                  <a v-if="job.url" :href="job.url" target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {{ job.title }}
                  </a>
                  <span v-else>{{ job.title }}</span>
                </div>
                <div class="text-sm text-muted-foreground">
                  <a v-if="job.url" :href="job.url" target="_blank" rel="noopener noreferrer" class="hover:underline">
                    {{ job.company }}
                  </a>
                  <span v-else>{{ job.company }}</span>
                   <span v-if="job.location">• {{ job.location }}</span>
                </div>
              </div>
              <Badge variant="secondary">
                {{ job.start }} → {{ job.end ?? "Present" }}
              </Badge>
            </div>

            <ul class="mt-4 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              <li v-for="b in job.bullets" :key="b">{{ b }}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
