#!/usr/bin/env sh
set -eu

if [ -f ./.env ]; then
  set -a
  . ./.env
  set +a
fi

APP_ENV=${APP_ENV:-production}

if [ "$APP_ENV" = "production" ]; then
  docker compose --profile prod pull
  docker compose --profile prod up -d --remove-orphans --no-build
else
  docker compose --profile dev up -d --remove-orphans
fi
