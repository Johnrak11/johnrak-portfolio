<script setup lang="ts">
import type { Profile } from "@/types/profile"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

defineProps<{ profile: Profile }>()
</script>

<template>
  <section id="contact" class="py-10 min-h-[60vh] flex flex-col justify-center">
    <h2 class="text-2xl font-semibold tracking-tight">Contact</h2>
    <Separator class="my-4" />

    <Card>
      <CardContent class="p-6">
        <p class="text-sm text-muted-foreground">
          Want to collaborate or discuss a project? Reach out.
        </p>

        <div class="mt-4 flex flex-wrap gap-2">
          <Button v-if="profile.basics.email" as-child>
            <a :href="`mailto:${profile.basics.email}`">Email</a>
          </Button>

          <Button v-for="l in profile.basics.links" :key="l.url" variant="outline" as-child>
            <a :href="l.url" target="_blank" rel="noreferrer">{{ l.label }}</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  </section>
</template>
