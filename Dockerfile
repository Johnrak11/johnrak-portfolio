# ---------- build the SPA ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines these into the JavaScript bundle at build time, so they are
# readable by anyone who loads the site. Only put values here that are safe
# to publish. VITE_PORTFOLIO_SHARED_SECRET is required by
# src/lib/profileStore.ts — without it the sync silently no-ops.
ARG VITE_ADMIN_API_BASE_URL
ARG VITE_PORTFOLIO_SHARED_SECRET
ENV VITE_ADMIN_API_BASE_URL=$VITE_ADMIN_API_BASE_URL
ENV VITE_PORTFOLIO_SHARED_SECRET=$VITE_PORTFOLIO_SHARED_SECRET

RUN npm run build

# ---------- serve it ----------
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
