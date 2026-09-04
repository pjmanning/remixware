#!/usr/bin/env bash
set -euo pipefail
cat .github/upload-parts/pnpm-lock.* > pnpm-lock.yaml
cat .github/upload-parts/og.png.* | base64 -d > public/og.png
echo "Assembled pnpm-lock.yaml ($(wc -c < pnpm-lock.yaml) bytes) and public/og.png ($(wc -c < public/og.png) bytes)"
