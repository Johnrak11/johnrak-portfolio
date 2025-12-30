<script setup lang="ts">
import { ref } from "vue"
import { useProfileStore } from "@/lib/profileStore"
import type { Profile } from "@/types/profile"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const store = useProfileStore()

const apiBase = "https://admin.johnrak.online"
const token = ref("")
const otp = ref("")
const loading = ref(false)
const error = ref<string | null>(null)
const ok = ref<string | null>(null)

async function syncFromAdmin() {
  if (!token.value || !otp.value) {
    error.value = "Please enter both Token and OTP."
    return
  }

  loading.value = true
  error.value = null
  ok.value = null

  try {
    // Assuming the endpoint expects a POST with token and otp
    // Adjust the URL and payload format as needed based on actual API
    const url = `${apiBase}/api/client/portfolio/sync`
    
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        token: token.value,
        otp: otp.value
      })
    })

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      throw new Error(errData.message || `HTTP ${res.status}`)
    }

    const data = (await res.json()) as Profile

    // Update store with new data
    store.setProfile(data, "cache")
    ok.value = "Success! Portfolio synced with Admin data."
  } catch (e: any) {
    console.error(e)
    error.value = e?.message ?? "Sync failed. Please check your credentials."
  } finally {
    loading.value = false
  }
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(store.profile, null, 2)], { type: "application/json" })
  const a = document.createElement("a")
  a.href = URL.createObjectURL(blob)
  a.download = "profile.json"
  a.click()
  URL.revokeObjectURL(a.href)
}
</script>

<template>
  <div class="mx-auto max-w-xl px-4 py-10 min-h-[60vh] flex flex-col justify-center">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold tracking-tight">Sync Portfolio</h1>
      <p class="mt-2 text-muted-foreground">
        Enter your admin credentials to sync the latest portfolio data.
      </p>
    </div>

    <Card>
      <CardContent class="space-y-6 p-6">
        <div class="space-y-2">
          <Label for="token">Admin Token</Label>
          <Input id="token" v-model="token" type="password" placeholder="Enter admin token" />
        </div>

        <div class="space-y-2">
          <Label for="otp">OTP Code</Label>
          <Input 
            id="otp" 
            v-model="otp" 
            type="text" 
            placeholder="000000" 
            maxlength="6" 
            class="tracking-widest text-center text-lg"
          />
        </div>

        <div class="pt-2">
          <Button class="w-full" size="lg" :disabled="loading" @click="syncFromAdmin">
            {{ loading ? "Syncing..." : "Sync Data" }}
          </Button>
        </div>

        <div v-if="ok" class="rounded-md bg-green-50 p-3 text-sm text-green-600 dark:bg-green-900/20 dark:text-green-400">
          {{ ok }}
        </div>
        
        <div v-if="error" class="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {{ error }}
        </div>
      </CardContent>
    </Card>

    <div class="mt-8 flex justify-center gap-4">
      <Button variant="ghost" size="sm" @click="store.resetToFile">
        Reset to Default (File)
      </Button>
    </div>
    
    <div class="mt-4 text-center text-xs text-muted-foreground">
      Current Data Source: <span class="font-medium text-foreground uppercase">{{ store.source }}</span>
    </div>
  </div>
</template>
