<script setup lang="ts">
import type { Profile } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const props = defineProps<{ profile: Profile }>();

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
</script>

<template>
  <section id="skills" class="py-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
    <h2 class="text-2xl font-semibold tracking-tight">Skills</h2>
    <Separator class="my-4" />

    <div
      class="flex flex-wrap gap-4 justify-center sm:justify-start"
    >
      <Card
        v-for="skill in profile.skills"
        :key="skill"
        class="group relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
      >
        <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
        <CardContent class="p-2 flex flex-col items-center gap-3 z-10">
          <img
            :src="getSkillLogo(skill)"
            :alt="skill"
            class="w-10 h-10 sm:w-12 sm:h-12 object-contain transition-transform duration-500 group-hover:rotate-[360deg]"
            @error="(e) => (e.target as HTMLImageElement).src = 'https://cdn.simpleicons.org/codeigniter'"
          />
          <span class="text-xs sm:text-sm font-medium text-center text-muted-foreground group-hover:text-primary transition-colors">{{
            skill
          }}</span>
        </CardContent>
      </Card>
    </div>
  </section>
</template>
