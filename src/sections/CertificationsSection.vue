<script setup lang="ts">
import type { Profile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useIntervalFn } from "@vueuse/core";
import { ref, onMounted, computed } from "vue";

const props = defineProps<{ profile: Profile }>();

const scrollContainer = ref<HTMLElement | null>(null);
const isAutoScrolling = ref(true);

const isCarousel = computed(() => props.profile.certifications.length > 3);

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
  <section id="certifications" class="py-10">
    <h2 class="text-2xl font-semibold tracking-tight">Certifications</h2>
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
        v-for="cert in profile.certifications"
        :key="cert.name"
        class="flex-none w-[350px] transition-transform hover:scale-[1.02]"
      >
        <CardContent class="p-6 h-full flex flex-col justify-between">
          <div class="flex flex-col gap-4">
            <div>
              <div
                class="text-lg font-semibold line-clamp-1"
                :title="cert.name"
              >
                {{ cert.name }}
              </div>
              <div class="text-sm text-muted-foreground">
                Issued by {{ cert.issuer }} • {{ cert.issued }}
              </div>
              <div
                v-if="cert.expires"
                class="text-xs text-muted-foreground mt-1"
              >
                Expires: {{ cert.expires }}
              </div>
            </div>

            <div class="flex items-center justify-between mt-auto pt-4">
              <Button
                v-if="cert.url"
                variant="outline"
                size="sm"
                class="w-full"
                as-child
              >
                <a :href="cert.url" target="_blank" rel="noopener noreferrer">
                  Verify Credential
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Grid Layout (<= 3 items) -->
    <div v-else class="grid gap-4 md:grid-cols-2">
      <Card v-for="cert in profile.certifications" :key="cert.name">
        <CardContent class="p-6">
          <div class="flex flex-col gap-4">
            <div>
              <div class="text-lg font-semibold">{{ cert.name }}</div>
              <div class="text-sm text-muted-foreground">
                Issued by {{ cert.issuer }} • {{ cert.issued }}
              </div>
              <div
                v-if="cert.expires"
                class="text-xs text-muted-foreground mt-1"
              >
                Expires: {{ cert.expires }}
              </div>
            </div>

            <div class="flex items-center justify-between">
              <Button v-if="cert.url" variant="outline" size="sm" as-child>
                <a :href="cert.url" target="_blank" rel="noopener noreferrer">
                  Verify Credential
                </a>
              </Button>
            </div>
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
