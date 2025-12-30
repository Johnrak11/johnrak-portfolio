# Johnrak Portfolio (Frontend)

## Overview

- Vue 3 + Vite + TypeScript + Tailwind
- Default data loaded from `src/data/profile.json`
- Reset page (`/reset`) can sync data from the admin backend using a token + OTP

## Requirements

- Node.js 18+ and npm

## Local Setup

- Install: `npm install`
- Dev: `npm run dev`
- Env:
  - `cp .env.example .env`
  - Set:
    - `VITE_ADMIN_API_BASE_URL=http://localhost:8000`
    - `VITE_ADMIN_BEARER_TOKEN=` (not required for token+OTP sync)
- Default file reset:
  - Use “Reset to Default (File)” to restore local JSON

## Production

- Build: `npm run build`
- Deploy `dist` to static hosting (Nginx/Apache/S3/Netlify)
- Set environment:
  - `VITE_ADMIN_API_BASE_URL=https://admin.yourdomain`
- Use HTTPS for both portfolio and admin

## Sync From Admin (Token + OTP)

- In Admin Security, click “Generate Sync Token” (24h expiry)
- On the portfolio `/reset` page:
  - Enter the token
  - Enter the 6-digit OTP from your authenticator app
  - Click “Sync Data”; the app will cache the returned JSON and display it
- Current code calls:
  - `POST {ADMIN_API_BASE}/api/client/portfolio/sync` with body `{ token, otp }`
  - The response matches [profile.ts](file:///Users/apple/DEV/Project/Personal%20web/johnrak-portfolio/src/types/profile.ts)

## Commands To Avoid In Production

- `npm run dev` (use `npm run build` and serve `dist`)
- Changing `src/data/profile.json` on the server (serve immutable artifacts)

## Utilities

- Manual export script is available at [scripts/sync-profile.mjs](file:///Users/apple/DEV/Project/Personal%20web/johnrak-portfolio/scripts/sync-profile.mjs) and can be wired to the admin API if needed.
