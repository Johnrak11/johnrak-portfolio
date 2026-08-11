# ---------- build the SPA ----------
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite inlines these into the JavaScript bundle at build time, so they are
# readable by anyone who loads the site. Only put values here that are safe
# to publish. VITE_PORTFOLIO_API_TOKEN authenticates every /api/client/* call —
# without it the profile sync no-ops and the AI chat gets 401.
ARG VITE_ADMIN_API_BASE_URL
ARG VITE_PORTFOLIO_API_TOKEN
ENV VITE_ADMIN_API_BASE_URL=$VITE_ADMIN_API_BASE_URL
ENV VITE_PORTFOLIO_API_TOKEN=$VITE_PORTFOLIO_API_TOKEN

RUN npm run build

# ---------- serve it ----------
FROM nginx:1.27-alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
