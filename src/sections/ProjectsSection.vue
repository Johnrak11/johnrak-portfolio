<script setup lang="ts">
import type { Profile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useIntervalFn } from "@vueuse/core";
import { ref, onMounted, computed } from "vue";
import { Github, ExternalLink } from "lucide-vue-next";

const props = defineProps<{ profile: Profile }>();

const scrollContainer = ref<HTMLElement | null>(null);
const isAutoScrolling = ref(true);

const isCarousel = computed(() => props.profile.projects.length > 3);

// Auto scroll logic
const { pause, resume } = useIntervalFn(() => {
  if (!scrollContainer.value || !isAutoScrolling.value || !isCarousel.value)
    return;

  if (
    scrollContainer.value.scrollLeft >=
    scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth
  ) {
    scrollContainer.value.scrollLeft = 0;
  } else {
    scrollContainer.value.scrollLeft += 1;
  }
}, 30);

const pauseScroll = () => {
  if (!isCarousel.value) return;
  isAutoScrolling.value = false;
  pause();
};

const resumeScroll = () => {
  if (!isCarousel.value) return;
  isAutoScrolling.value = true;
  resume();
};

onMounted(() => {
  if (isCarousel.value) {
    resume();
  }
});
</script>

<template>
  <section id="projects" class="py-10">
    <div class="flex items-end justify-between gap-4">
      <h2 class="text-2xl font-semibold tracking-tight">Projects</h2>
      <p class="text-sm text-muted-foreground">Selected work</p>
    </div>

    <Separator class="my-4" />

    <!-- Carousel Layout (> 3 items) -->
    <div
      v-if="isCarousel"
      ref="scrollContainer"
      class="flex overflow-x-auto gap-4 pb-4 max-w-full no-scrollbar cursor-grab active:cursor-grabbing"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
      @touchstart="pauseScroll"
      @touchend="resumeScroll"
    >
      <Card
        v-for="p in profile.projects"
        :key="p.name"
        class="group flex-none w-[350px] transition-transform hover:scale-[1.02]"
      >
        <CardContent class="p-6 h-full flex flex-col justify-between">
          <div class="flex flex-col gap-4">
            <div>
              <div class="flex items-center justify-between">
                <div class="text-lg font-semibold">{{ p.name }}</div>
                <div
                  class="flex gap-2 opacity-0 transition group-hover:opacity-100"
                >
                  <Button
                    v-for="link in p.links"
                    :key="link.label"
                    variant="outline"
                    size="icon"
                    class="h-8 w-8"
                    as-child
                  >
                    <a
                      :href="link.url"
                      target="_blank"
                      rel="noreferrer"
                      :title="link.label"
                    >
                      <Github v-if="link.label === 'GitHub'" class="h-4 w-4" />
                      <ExternalLink v-else class="h-4 w-4" />
                      <span class="sr-only">{{ link.label }}</span>
                    </a>
                  </Button>
                </div>
              </div>
              <p class="mt-1 text-sm text-muted-foreground line-clamp-2">
                {{ p.tagline }}
              </p>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <Badge v-for="s in p.stack" :key="s" variant="secondary">{{
              s
            }}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Grid Layout (<= 3 items) -->
    <div v-else class="grid gap-4 md:grid-cols-2">
      <Card v-for="p in profile.projects" :key="p.name" class="group">
        <CardContent class="p-6">
          <div class="flex items-start justify-between gap-4">
            <div>
              <div class="text-lg font-semibold">{{ p.name }}</div>
              <p class="mt-1 text-sm text-muted-foreground">{{ p.tagline }}</p>
            </div>

            <div
              class="flex gap-2 opacity-0 transition group-hover:opacity-100"
            >
              <Button
                v-for="link in p.links"
                :key="link.label"
                variant="outline"
                size="sm"
                class="gap-2"
                as-child
              >
                <a :href="link.url" target="_blank" rel="noreferrer">
                  <Github v-if="link.label === 'GitHub'" class="h-4 w-4" />
                  <ExternalLink v-else class="h-4 w-4" />
                  {{ link.label }}
                </a>
              </Button>
            </div>
          </div>

          <div class="mt-4 flex flex-wrap gap-2">
            <Badge v-for="s in p.stack" :key="s" variant="secondary">{{
              s
            }}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
