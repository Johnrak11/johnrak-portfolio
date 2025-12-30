<script setup lang="ts">
import { Button } from "@/components/ui/button"
import ModeToggle from "@/components/ModeToggle.vue"
</script>

<template>
  <header class="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
      <router-link to="/" class="flex items-center gap-2 font-semibold tracking-tight">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-xl border">JR</span>
        <span>Portfolio</span>
      </router-link>

      <nav class="hidden items-center gap-3 md:flex">
        <a href="#about" class="text-sm text-muted-foreground hover:text-foreground">About</a>
        <a href="#experience" class="text-sm text-muted-foreground hover:text-foreground">Experience</a>
        <a href="#projects" class="text-sm text-muted-foreground hover:text-foreground">Projects</a>
        <a href="#skills" class="text-sm text-muted-foreground hover:text-foreground">Skills</a>
        <a href="#contact" class="text-sm text-muted-foreground hover:text-foreground">Contact</a>
      </nav>

      <div class="flex items-center gap-2">
        <ModeToggle />
        <Button as-child class="hidden md:inline-flex">
          <a href="#contact">Hire / Contact</a>
        </Button>
      </div>
    </div>
  </header>
</template>
