import { defineStore } from "pinia"
import type { Profile } from "@/types/profile"
import profileJson from "@/data/profile.json"

const LS_KEY = "johnrak_portfolio_profile_cache_v1"

function readCache(): Profile | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as Profile) : null
  } catch {
    return null
  }
}

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: (readCache() ?? (profileJson as Profile)) as Profile,
    source: (readCache() ? "cache" : "file") as "file" | "cache"
  }),
  actions: {
    setProfile(p: Profile, source: "file" | "cache") {
      this.profile = p
      this.source = source
      localStorage.setItem(LS_KEY, JSON.stringify(p))
    },
    resetToFile() {
      this.profile = profileJson as Profile
      this.source = "file"
      localStorage.removeItem(LS_KEY)
    }
  }
})
