#!/usr/bin/env bash
# Deploy metropointtech-website to production AND point both canonical
# domains at the new build. Run this from the repo root.
#
# Usage: ./deploy.sh
#
# This exists because the Vercel project is not yet connected to GitHub,
# so `npx vercel --prod` alone ships a build that is not actually live
# on www.metropointtech.com. This script closes that gap every time.
set -euo pipefail

echo "==> Pushing latest master to origin"
git push origin master

echo "==> Running Vercel production build"
DEPLOY_URL=$(npx vercel --prod 2>&1 | tee /dev/stderr | grep -oE 'https://metropointtech-website-[a-z0-9]+-[a-z0-9-]+\.vercel\.app' | head -1)

if [ -z "$DEPLOY_URL" ]; then
  echo "Could not parse deploy URL from Vercel output" >&2
  exit 1
fi

echo "==> New deploy: $DEPLOY_URL"

echo "==> Pointing www.metropointtech.com"
npx vercel alias set "$DEPLOY_URL" www.metropointtech.com

echo "==> Pointing metropointtech.com"
npx vercel alias set "$DEPLOY_URL" metropointtech.com

echo "==> Done. Live at https://www.metropointtech.com"
