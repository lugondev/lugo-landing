#!/bin/bash
# Sinh GIF động cho logo LUGO (4 trạng thái + 1 kịch bản "cycle").
# Frame SVG do gen-logo-anim.mjs sinh (khớp keyframe LugoMark.css); rasterize bằng
# sips; ghép GIF bằng ffmpeg (palette tối ưu). Cần: node + sips + ffmpeg.
#
#   bash scripts/gen-logo-anim.sh
#
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/brand"
TMP="$(mktemp -d)"
FPS=20
SIZE=400   # cạnh GIF (px)

echo "1/3  Sinh frame SVG…"
node "$ROOT/scripts/gen-logo-anim.mjs" "$TMP" "$FPS"

echo "2/3  Rasterize frame (sips)…"
find "$TMP" -name '*.svg' | while read -r f; do
  sips -s format png "$f" --out "${f%.svg}.png" >/dev/null 2>&1
done

echo "3/3  Ghép GIF (ffmpeg)…"
mkdir -p "$OUT"
for name in idle listening thinking speaking cycle; do
  dir="$TMP/$name"
  [ -d "$dir" ] || continue
  ffmpeg -y -framerate "$FPS" -i "$dir/f%04d.png" \
    -vf "scale=$SIZE:-1:flags=lanczos,split[s0][s1];[s0]palettegen=stats_mode=full[p];[s1][p]paletteuse=dither=bayer:bayer_scale=3" \
    -loop 0 "$OUT/logo-anim-$name.gif" >/dev/null 2>&1
  echo "  -> logo-anim-$name.gif"
done

echo "Xong. Kích thước:"
( cd "$OUT" && ls -lh logo-anim-*.gif 2>/dev/null | awk '{print "  "$9"  "$5}' )
