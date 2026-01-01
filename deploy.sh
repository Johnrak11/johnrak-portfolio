#!/usr/bin/env sh
set -eu

if [ -f ./.env ]; then
  set -a
  . ./.env
  set +a
fi

APP_ENV=${APP_ENV:-production}
PROJECT_NAME="johnrak-portfolio"

if [ "$APP_ENV" = "production" ]; then
  # Try to pull, but don't fail if we can't (e.g. no auth or image doesn't exist yet)
  docker compose -p "$PROJECT_NAME" --profile prod pull || true
  # Build from source if needed (fixes "no image" error)
  docker compose -p "$PROJECT_NAME" --profile prod up -d --remove-orphans --build
else
  docker compose -p "$PROJECT_NAME" --profile dev up -d --remove-orphans --build
fi
