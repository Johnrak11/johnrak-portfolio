<script setup lang="ts">
import type { Profile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useIntervalFn } from "@vueuse/core";
import { ref, onMounted } from "vue";

const props = defineProps<{ profile: Profile }>();

const scrollContainer = ref<HTMLElement | null>(null);
const isAutoScrolling = ref(true);

// Function to map skill name to a logo URL (using devicons or simple text if not found)
// In a real app, you might want to have these URLs in your profile.json or a local assets map
const getSkillLogo = (skill: string) => {
  const s = skill.toLowerCase().replace(/\./g, "").replace(/\s+/g, "");
  // Mapping for specific cases
  const map: Record<string, string> = {
    "c#": "csharp",
    "vue.js": "vuedotjs",
    vuejs: "vuedotjs",
    "node.js": "nodedotjs",
    nodejs: "nodedotjs",
    "adobe coldfusion": "adobe", // Simple Icons doesn't have ColdFusion, using Adobe
    coldfusion: "adobe",
    "asp.net": "dotnet",
    mariadb: "mariadb",
    mysql: "mysql",
    java: "openjdk", // Simple Icons uses OpenJDK for Java
    python: "python",
    azure: "microsoftazure",
    html: "html5",
    sass: "sass",
    bootstrap: "bootstrap",
    php: "php",
    javascript: "javascript",
  };

  const name = map[skill.toLowerCase()] || s;
  return `https://cdn.simpleicons.org/${name}`;
};

// Auto scroll logic
const { pause, resume } = useIntervalFn(() => {
  if (!scrollContainer.value || !isAutoScrolling.value) return;

  if (
    scrollContainer.value.scrollLeft >=
    scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth
  ) {
    scrollContainer.value.scrollLeft = 0;
  } else {
    scrollContainer.value.scrollLeft += 1;
  }
}, 20);

const onScroll = () => {
  // If user manually scrolls, pause auto-scroll temporarily
  // We can detect manual scroll if the scroll position changes significantly differently than our auto-scroll
  // For simplicity, let's just pause on mouse enter/touch
};

const pauseScroll = () => {
  isAutoScrolling.value = false;
  pause();
};

const resumeScroll = () => {
  isAutoScrolling.value = true;
  resume();
};

onMounted(() => {
  resume();
});
</script>

<template>
  <section id="skills" class="py-10">
    <h2 class="text-2xl font-semibold tracking-tight">Skills</h2>
    <Separator class="my-4" />

    <div
      ref="scrollContainer"
      class="flex overflow-x-auto gap-4 pb-4 max-w-full no-scrollbar cursor-grab active:cursor-grabbing"
      @mouseenter="pauseScroll"
      @mouseleave="resumeScroll"
      @touchstart="pauseScroll"
      @touchend="resumeScroll"
    >
      <Card
        v-for="skill in profile.skills"
        :key="skill"
        class="flex-none w-[120px] h-[120px] flex items-center justify-center transition-transform hover:scale-105"
      >
        <CardContent class="p-4 flex flex-col items-center gap-3">
          <img
            :src="getSkillLogo(skill)"
            :alt="skill"
            class="w-10 h-10 object-contain"
            @error="(e) => (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/codeigniter'"
          />
          <span class="text-sm font-medium text-center text-muted-foreground">{{
            skill
          }}</span>
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
