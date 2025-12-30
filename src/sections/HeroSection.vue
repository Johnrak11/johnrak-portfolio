<script setup lang="ts">
import type { Profile } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ref, onMounted, computed } from "vue";
import resumeUrl from "@/assets/Vorak-Yun-VC.pdf";

const props = defineProps<{ profile: Profile }>();

const displayedText = ref("");
const fullText = computed(() => `Hi There, I'm ${props.profile.basics.name}`);
const isTyping = ref(true);

onMounted(() => {
  let i = 0;
  const speed = 100; // ms per char

  const typeWriter = () => {
    if (i < fullText.value.length) {
      displayedText.value += fullText.value.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    } else {
      isTyping.value = false;
    }
  };

  // Start typing after a short delay
  setTimeout(typeWriter, 500);
});
</script>

<template>
  <section class="py-10 md:py-16">
    <div class="grid gap-6 md:grid-cols-12 md:items-center">
      <div class="md:col-span-8">
        <Badge variant="secondary" class="mb-3"
          >Open to Work • 2025 • Portfolio</Badge
        >

        <h1
          class="text-balance text-3xl font-semibold tracking-tight md:text-5xl min-h-[1.2em]"
        >
          {{ displayedText
          }}<span v-if="isTyping" class="animate-pulse">|</span>
        </h1>

        <p class="mt-2 text-lg text-muted-foreground md:text-xl">
          {{ profile.basics.headline }} • {{ profile.basics.location }}
        </p>

        <p class="mt-4 max-w-2xl text-pretty text-muted-foreground">
          {{ profile.basics.summary }}
        </p>

        <div class="mt-6 flex flex-wrap gap-2">
          <Button as-child>
            <a href="#projects">View Projects</a>
          </Button>
          <Button variant="outline" as-child>
            <a href="#contact">Contact</a>
          </Button>
          <Button variant="outline" as-child>
            <a :href="resumeUrl" download="Vorak_Yun_CV.pdf">Download CV</a>
          </Button>
          <Button variant="ghost" as-child>
            <router-link to="/reset">Sync from Admin</router-link>
          </Button>
        </div>
      </div>

      <div class="md:col-span-4">
        <Card class="overflow-hidden">
          <CardContent class="p-0">
            <div class="relative aspect-square w-full bg-muted">
              <img
                src="@/assets/profile-photo.JPG"
                alt="Profile Photo"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div class="grid grid-cols-3 gap-2 p-4">
              <div
                v-for="h in profile.highlights"
                :key="h.label"
                class="rounded-xl border p-3"
              >
                <div class="text-lg font-semibold">{{ h.value }}</div>
                <div class="text-xs text-muted-foreground">{{ h.label }}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>
