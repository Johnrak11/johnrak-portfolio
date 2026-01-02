<script setup lang="ts">
import SiteHeader from "@/components/SiteHeader.vue";
import SiteFooter from "@/components/SiteFooter.vue";
import ChatWidget from "@/components/ChatWidget.vue";
import { onMounted } from "vue";
import { useProfileStore } from "@/lib/profileStore";

const store = useProfileStore();

onMounted(() => {
  store.fetchLatestProfile();
});
</script>

<template>
  <div class="min-h-dvh w-full overflow-x-hidden bg-background text-foreground">
    <SiteHeader />
    <main>
      <router-view />
    </main>
    <SiteFooter />
    <ChatWidget />
  </div>
</template>
