#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

if [ -f ./.env ]; then
  set -a
  . ./.env
  set +a
fi

APP_ENV=${APP_ENV:-production}
PROJECT_NAME="portfolio"

if [ "$APP_ENV" != "production" ]; then
  docker compose -p "$PROJECT_NAME" --profile dev up -d --remove-orphans --build
  exit 0
fi

# Shared with the edge proxy in the infra repo.
if ! docker network inspect infra_edge >/dev/null 2>&1; then
  echo "ERROR: network 'infra_edge' does not exist."
  echo "       Deploy the infra stack first: cd ../infra && docker compose up -d"
  exit 1
fi

if [ "${BUILD_LOCALLY:-0}" = "1" ]; then
  # Vite inlines these at BUILD time, so they must be present here.
  if [ -z "${VITE_PORTFOLIO_SHARED_SECRET:-}" ]; then
    echo "ERROR: VITE_PORTFOLIO_SHARED_SECRET is not set in .env."
    echo "       Without it src/lib/profileStore.ts skips the sync silently."
    echo "       Copy PORTFOLIO_SHARED_SECRET from the admin's backend/.env."
    exit 1
  fi
  echo "==> BUILD_LOCALLY=1: building on this host"
  docker compose -p "$PROJECT_NAME" --profile prod up -d --remove-orphans --build
else
  # The previous version ran `pull || true` and then always rebuilt, so a
  # failed pull was invisible and the droplet built every single deploy.
  echo "==> Pulling prebuilt image (IMAGE_TAG=${IMAGE_TAG:-latest})..."
  if ! docker compose -p "$PROJECT_NAME" --profile prod pull; then
    echo
    echo "ERROR: could not pull the image. Likely one of:"
    echo "  - CI has not published it yet (push to the prod branch first)"
    echo "  - the GHCR package is still private, so this host cannot read it"
    echo "    -> make it public, or run: docker login ghcr.io"
    echo
    echo "To build on this host instead: BUILD_LOCALLY=1 ./deploy.sh"
    exit 1
  fi
  docker compose -p "$PROJECT_NAME" --profile prod up -d --remove-orphans
fi

docker image prune -f >/dev/null
docker compose -p "$PROJECT_NAME" --profile prod ps
