<script setup lang="ts">
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle.vue";
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <router-link
        to="/"
        class="flex items-center gap-2 font-semibold tracking-tight"
      >
        <span
          class="inline-flex h-8 w-8 items-center justify-center rounded-xl border"
          >JR</span
        >
        <span>Portfolio</span>
      </router-link>

      <nav class="hidden items-center gap-3 md:flex">
        <a
          href="#about"
          class="text-sm text-muted-foreground hover:text-foreground"
          >About</a
        >
        <a
          href="#experience"
          class="text-sm text-muted-foreground hover:text-foreground"
          >Experience</a
        >
        <a
          href="#projects"
          class="text-sm text-muted-foreground hover:text-foreground"
          >Projects</a
        >
        <a
          href="#skills"
          class="text-sm text-muted-foreground hover:text-foreground"
          >Skills</a
        >
        <a
          href="#contact"
          class="text-sm text-muted-foreground hover:text-foreground"
          >Contact</a
        >
      </nav>

      <div class="flex items-center gap-2">
        <ModeToggle />
        <Button
          class="hidden md:inline-flex bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          @click="toggleChat"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="mr-2 h-4 w-4 animate-pulse"
          >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
          Ask about me
        </Button>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  methods: {
    toggleChat() {
      window.dispatchEvent(new Event("toggle-chat"));
    },
  },
};
</script>
