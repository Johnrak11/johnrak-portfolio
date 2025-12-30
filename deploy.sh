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
  docker compose -p "$PROJECT_NAME" --profile prod pull
  docker compose -p "$PROJECT_NAME" --profile prod up -d --remove-orphans --no-build
else
  docker compose -p "$PROJECT_NAME" --profile dev up -d --remove-orphans
fi
