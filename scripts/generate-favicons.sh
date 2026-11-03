#!/usr/bin/env bash
# Rasterize docs/brand/logo.svg into the public/ favicon set.
#
# Requires ImageMagick (`magick`) plus a SVG rasterizer: rsvg-convert if
# available, otherwise Google Chrome / Chromium in headless mode.
# Run scripts/generate-logo.py first to (re)create the SVG.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
svg="$root/docs/brand/logo.svg"
pub="$root/public"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

render() { # <size> <outfile> -- rasterize the SVG to a square PNG
  local size="$1" out="$2"
  if command -v rsvg-convert >/dev/null 2>&1; then
    rsvg-convert -w "$size" -h "$size" "$svg" -o "$out"
    return
  fi
  local chrome=""
  for c in "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
           "$(command -v google-chrome 2>/dev/null || true)" \
           "$(command -v chromium 2>/dev/null || true)"; do
    if [ -n "$c" ] && [ -x "$c" ]; then chrome="$c"; break; fi
  done
  [ -n "$chrome" ] || { echo "Need rsvg-convert or Chrome/Chromium" >&2; exit 1; }
  printf '<!doctype html><meta charset=utf-8><style>*{margin:0}svg{width:%spx;height:%spx;display:block}</style>%s' \
    "$size" "$size" "$(cat "$svg")" > "$tmp/r.html"
  "$chrome" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$size,$size" --screenshot="$out" "file://$tmp/r.html" >/dev/null 2>&1
}

# Render a large master once, then downscale for crisp small sizes.
render 1024 "$tmp/master.png"
magick "$tmp/master.png" -resize 512x512 "$pub/android-chrome-512x512.png"
magick "$tmp/master.png" -resize 192x192 "$pub/android-chrome-192x192.png"
magick "$tmp/master.png" -resize 180x180 "$pub/apple-touch-icon.png"
magick "$tmp/master.png" -resize 32x32   "$pub/favicon-32x32.png"
magick "$tmp/master.png" -resize 16x16   "$pub/favicon-16x16.png"
magick "$pub/favicon-16x16.png" "$pub/favicon-32x32.png" "$pub/favicon.ico"

echo "Favicons regenerated in $pub"
