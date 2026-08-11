/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADMIN_API_BASE_URL?: string
  // Read by src/lib/profileStore.ts. Inlined into the public bundle at build
  // time, so it is not a confidential value in practice.
  readonly VITE_PORTFOLIO_SHARED_SECRET?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
