import { defineStore } from "pinia";
import type { Profile } from "@/types/profile";
import profileJson from "@/data/profile.json";
import CryptoJS from "crypto-js";

const LS_KEY = "johnrak_portfolio_profile_cache_v1";

function readCache(): Profile | null {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  } catch {
    return null;
  }
}

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profile: (readCache() ?? (profileJson as Profile)) as Profile,
    source: (readCache() ? "cache" : "file") as "file" | "cache",
    loading: false,
    error: null as string | null,
  }),
  actions: {
    setProfile(p: Profile, source: "file" | "cache") {
      this.profile = p;
      this.source = source;
      localStorage.setItem(LS_KEY, JSON.stringify(p));
    },
    resetToFile() {
      this.profile = profileJson as Profile;
      this.source = "file";
      localStorage.removeItem(LS_KEY);
    },
    async fetchLatestProfile() {
      const apiBase = (
        import.meta.env.VITE_ADMIN_API_BASE_URL ||
        "https://admin.johnrak.online"
      ).replace(/\/$/, "");
      const sharedSecret = import.meta.env.VITE_PORTFOLIO_SHARED_SECRET;

      if (!sharedSecret) {
        console.warn("Skipping sync: VITE_PORTFOLIO_SHARED_SECRET not set");
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        const url = `${apiBase}/api/client/portfolio/sync`;
        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Portfolio-Key": sharedSecret,
          },
        });

        if (!res.ok) {
          throw new Error(`Sync failed: HTTP ${res.status}`);
        }

        const json = await res.json();
        if (!json.payload || !json.iv) {
          throw new Error("Invalid encrypted response format");
        }

        // Decrypt
        const keyHash = CryptoJS.SHA256(sharedSecret);
        const iv = CryptoJS.enc.Base64.parse(json.iv);
        const decrypted = CryptoJS.AES.decrypt(json.payload, keyHash, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        });

        const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedStr) {
          throw new Error("Decryption failed (empty result)");
        }

        const data = JSON.parse(decryptedStr) as Profile;
        this.setProfile(data, "cache");
        console.log("Portfolio synced successfully from Admin");
      } catch (e: any) {
        console.error("Portfolio sync error:", e);
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
