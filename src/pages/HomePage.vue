<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "@/lib/profileStore";
import HeroSection from "@/sections/HeroSection.vue";
import AboutSection from "@/sections/AboutSection.vue";
import ExperienceSection from "@/sections/ExperienceSection.vue";
import EducationSection from "@/sections/EducationSection.vue";
import CertificationsSection from "@/sections/CertificationsSection.vue";
import ProjectsSection from "@/sections/ProjectsSection.vue";
import SkillsSection from "@/sections/SkillsSection.vue";
import ContactSection from "@/sections/ContactSection.vue";

const store = useProfileStore();
const { profile } = storeToRefs(store);
</script>

<template>
  <div id="top" class="mx-auto max-w-6xl px-4">
    <HeroSection :profile="profile" />
    <AboutSection :profile="profile" />
    <ExperienceSection :profile="profile" />
    <EducationSection :profile="profile" />
    <CertificationsSection :profile="profile" />
    <ProjectsSection :profile="profile" />
    <SkillsSection :profile="profile" />
    <ContactSection :profile="profile" />
  </div>
</template>
