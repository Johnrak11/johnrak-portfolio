<template>
  <div>
    <!-- Chat Window -->
    <div
      v-if="open"
      class="fixed bottom-0 right-0 z-50 flex h-[100dvh] w-full flex-col border border-border bg-card shadow-2xl transition-all sm:bottom-20 sm:right-4 sm:h-[600px] sm:w-[400px] sm:rounded-xl"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-border bg-muted/30 px-4 py-3"
      >
        <div class="flex items-center gap-2">
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
            class="h-5 w-5"
          >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
          </svg>
          <div>
            <div class="text-sm font-semibold">Johnrak AI</div>
            <div class="text-xs text-muted-foreground">
              Ask about projects & skills
            </div>
          </div>
        </div>
        <button
          class="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          @click="open = false"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 18 18" />
          </svg>
        </button>
      </div>

      <!-- Messages Area -->
      <div class="flex-1 overflow-y-auto bg-background p-4" ref="scrollArea">
        <div
          v-if="msgs.length === 0"
          class="flex h-full flex-col items-center justify-center space-y-4 text-center text-muted-foreground opacity-80"
        >
          <div class="rounded-full bg-muted p-4">
            <span class="text-3xl">👋</span>
          </div>
          <div class="max-w-[250px] space-y-1">
            <p class="font-medium text-foreground">Hi there!</p>
            <p class="text-sm">
              I'm Vorak's digital assistant. Ask me anything about his work,
              skills, or experience.
            </p>
          </div>
          <div class="grid grid-cols-1 gap-2 text-xs">
            <button
              @click="
                draft = 'What projects has Vorak built?';
                send();
              "
              class="rounded-full border bg-background px-3 py-1.5 hover:bg-muted"
            >
              What projects has Vorak built?
            </button>
            <button
              @click="
                draft = 'Does Vorak know Vue.js?';
                send();
              "
              class="rounded-full border bg-background px-3 py-1.5 hover:bg-muted"
            >
              Does Vorak know Vue.js?
            </button>
          </div>
        </div>

        <div v-for="(m, i) in msgs" :key="i" class="mb-4 flex w-full">
          <div
            :class="[
              'flex w-full',
              m.role === 'user' ? 'justify-end' : 'justify-start',
            ]"
          >
            <div
              :class="[
                'max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-sm break-words',
                m.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-tr-sm'
                  : 'bg-muted text-foreground rounded-tl-sm prose-content',
              ]"
            >
              <div v-if="m.role === 'user'">{{ m.content }}</div>
              <div v-else v-html="renderMarkdown(m.content)"></div>
            </div>
          </div>
        </div>

        <div v-if="loading" class="mb-4 flex w-full justify-start">
          <div
            class="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-muted-foreground"
          >
            <span
              class="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
              style="animation-delay: 0ms"
            ></span>
            <span
              class="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
              style="animation-delay: 150ms"
            ></span>
            <span
              class="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
              style="animation-delay: 300ms"
            ></span>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-border bg-background p-3">
        <div class="relative flex items-center gap-2">
          <Input
            v-model="draft"
            placeholder="Type your message..."
            class="flex-1 rounded-full border-muted bg-muted/30 pr-10 focus-visible:ring-offset-0"
            @keyup.enter="send"
            :disabled="loading"
          />
          <Button
            @click="send"
            :disabled="loading || !draft"
            size="icon"
            class="absolute right-1 h-8 w-8 rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </Button>
        </div>
        <div class="mt-2 text-center text-[10px] text-muted-foreground">
          Powered by Johnrak AI • Information based on portfolio data
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, onMounted, onUnmounted } from "vue";
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { api } from "@/lib/api";
import MarkdownIt from "markdown-it";

const md = new MarkdownIt({
  breaks: true,
  linkify: true,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

const open = ref(false);
const loading = ref(false);
const draft = ref("");
const msgs = ref<Message[]>([]);
const scrollArea = ref<HTMLDivElement | null>(null);

// Expose open state to parent/global bus if needed, or use a custom event listener
const toggleChat = () => {
  open.value = !open.value;
};

// Listen for custom event 'toggle-chat'
onMounted(() => {
  window.addEventListener("toggle-chat", toggleChat);
});

onUnmounted(() => {
  window.removeEventListener("toggle-chat", toggleChat);
});

function renderMarkdown(text: string) {
  return md.render(text);
}

function scrollToBottom() {
  nextTick(() => {
    if (scrollArea.value) {
      scrollArea.value.scrollTop = scrollArea.value.scrollHeight;
    }
  });
}

watch(msgs, scrollToBottom, { deep: true });
watch(open, (val) => {
  if (val) scrollToBottom();
});

async function send() {
  const text = draft.value.trim();
  if (!text || loading.value) return;

  msgs.value.push({ role: "user", content: text });
  draft.value = "";
  loading.value = true;
  scrollToBottom();

  try {
    const res = await api.post("/api/client/ai/chat", {
      message: text,
      history: msgs.value,
    });
    const reply = res.data?.assistant || "";
    msgs.value.push({ role: "assistant", content: reply });
  } catch (e) {
    msgs.value.push({
      role: "assistant",
      content: "Vorak's AI is resting. Try again in a minute.",
    });
  } finally {
    loading.value = false;
    scrollToBottom();
  }
}
</script>

<style scoped>
:deep(.prose-content ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
:deep(.prose-content ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
:deep(.prose-content p) {
  margin-bottom: 0.5rem;
}
:deep(.prose-content p:last-child) {
  margin-bottom: 0;
}
:deep(.prose-content strong) {
  font-weight: 700;
}
:deep(.prose-content a) {
  color: hsl(var(--primary));
  text-decoration: underline;
}
</style>
