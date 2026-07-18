#!/bin/bash
# Sinh bộ logo LUGO vào public/brand: SVG nguồn (vector) + PNG/JPEG xuất từ SVG.
# Rasterize bằng `sips` (có sẵn trên macOS) — không cần cài thêm công cụ.
# Hình học vòng+chấm lấy đúng từ src/components/LugoMark.tsx & public/favicon.svg.
#
#   bash scripts/gen-logo.sh
#
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/brand"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

# --- Hình học chuẩn (không đổi) ---
RING='cx="50" cy="50" r="38" fill="none" stroke-width="9" stroke-linecap="round" stroke-dasharray="204.76 34" transform="rotate(-19.4 50 50)"'
DOT='cx="76.87" cy="23.13" r="6"'

icon_svg () { # file bg ring dot [grad]
  local file="$1" bg="$2" ring="$3" dot="$4" grad="$5" defs="" fill
  fill="$bg"
  if [ -n "$grad" ]; then
    defs='<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a00"/><stop offset="1" stop-color="#ffc857"/></linearGradient></defs>'
    fill="url(#g)"
  fi
  cat > "$OUT/$file" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="256" height="256">
  $defs<rect width="100" height="100" rx="22" fill="$fill"/>
  <circle $RING stroke="$ring"/>
  <circle $DOT fill="$dot"/>
</svg>
EOF
}

mark_svg () { # file ring dot
  cat > "$OUT/$1" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="256" height="256">
  <circle $RING stroke="$2"/>
  <circle $DOT fill="$3"/>
</svg>
EOF
}

# Chữ "LUGO" đã OUTLINE sẵn từ Be Vietnam Pro weight 800 (font-size 46, baseline
# y=0). Dùng path vector nên PNG/JPEG không phụ thuộc font cài trên máy — luôn
# đúng chữ. Sinh lại path: node scripts/outline-wordmark.mjs (xem file đó).
LUGO_PATH='M27.28 0L2.94 0L2.94-34.04L10.90-34.04L10.90-6.90L27.28-6.90L27.28 0M47.89 0.46Q45.17 0.46 42.64-0.30Q40.11-1.06 38.11-2.71Q36.11-4.37 34.94-7.04Q33.76-9.71 33.76-13.48L33.76-34.04L41.72-34.04L41.72-13.48Q41.72-10.76 43.22-8.90Q44.71-7.04 47.89-7.04Q51.06-7.04 52.55-8.90Q54.05-10.76 54.05-13.48L54.05-34.04L62.01-34.04L62.01-13.48Q62.01-9.71 60.84-7.04Q59.66-4.37 57.66-2.71Q55.66-1.06 53.13-0.30Q50.60 0.46 47.89 0.46M84.87 0.46Q80.55 0.46 77.28-1.01Q74.01-2.48 71.83-4.99Q69.64-7.50 68.56-10.60Q67.48-13.71 67.48-16.97Q67.48-20.24 68.59-23.37Q69.69-26.50 71.88-29Q74.06-31.51 77.37-33.01Q80.68-34.50 85.10-34.50Q88.60-34.50 91.08-33.63Q93.56-32.75 95.24-31.37Q96.92-29.99 97.96-28.45Q98.99-26.91 99.52-25.55Q100.05-24.20 100.21-23.32Q100.37-22.45 100.37-22.45L92.46-22.45Q92.46-22.45 92.21-23.21Q91.95-23.97 91.19-24.98Q90.44-25.99 88.96-26.75Q87.49-27.51 85.10-27.51Q81.97-27.51 79.88-25.99Q77.79-24.47 76.73-22.08Q75.67-19.69 75.67-17.11Q75.67-14.44 76.75-12.03Q77.83-9.61 79.95-8.05Q82.06-6.49 85.19-6.49Q88.50-6.49 90.46-8.10Q92.41-9.71 92.87-12.37L84.46-12.37L84.46-18.58L100.74-18.58L100.74-15.87Q100.74-10.49 98.69-6.85Q96.65-3.22 93.06-1.38Q89.47 0.46 84.87 0.46M122.36 0.46Q117.99 0.46 114.72-1.03Q111.46-2.53 109.27-5.04Q107.09-7.54 105.98-10.67Q104.88-13.80 104.88-17.07Q104.88-20.33 105.98-23.44Q107.09-26.54 109.27-29.03Q111.46-31.51 114.72-33.01Q117.99-34.50 122.36-34.50Q126.68-34.50 129.95-33.01Q133.22-31.51 135.40-29.03Q137.59-26.54 138.69-23.44Q139.79-20.33 139.79-17.07Q139.79-13.80 138.69-10.67Q137.59-7.54 135.40-5.04Q133.22-2.53 129.95-1.03Q126.68 0.46 122.36 0.46M122.36-6.67Q125.35-6.67 127.40-8.19Q129.44-9.71 130.48-12.07Q131.51-14.44 131.51-17.07Q131.51-19.64 130.48-22.01Q129.44-24.38 127.40-25.90Q125.35-27.42 122.36-27.42Q119.32-27.42 117.28-25.90Q115.23-24.38 114.22-22.01Q113.21-19.64 113.21-17.07Q113.21-14.44 114.22-12.07Q115.23-9.71 117.28-8.19Q119.32-6.67 122.36-6.67'

lockup_svg () { # file ring dot word
  cat > "$OUT/$1" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 100" width="256" height="100">
  <circle $RING stroke="$2"/>
  <circle $DOT fill="$3"/>
  <path transform="translate(109.06 67.02)" fill="$4" d="$LUGO_PATH"/>
</svg>
EOF
}

# ---- SVG nguồn ----
icon_svg logo-icon-ink.svg    "#111111" "#f7f4ee" "#ff8a00"
icon_svg logo-icon-cream.svg  "#f7f4ee" "#111111" "#ff8a00"
icon_svg logo-icon-accent.svg ""        "#ffffff" "#ffffff" grad
mark_svg logo-mark-ink.svg    "#111111" "#ff8a00"
mark_svg logo-mark-light.svg  "#f7f4ee" "#ff8a00"
mark_svg logo-mark-accent.svg "#ff8a00" "#ff8a00"
lockup_svg logo-lockup-ink.svg   "#111111" "#ff8a00" "#111111"
lockup_svg logo-lockup-light.svg "#f7f4ee" "#ff8a00" "#f7f4ee"

# ---- Rasterize: PNG (mọi bản) + JPEG (chỉ bản có nền đặc) @1024px ----
raster () { # svg jpg|nojpg
  local svg="$1" jpeg="$2" base w h
  base="${svg%.svg}"   # tách dòng: KHÔNG gộp cùng dòng local với svg (bash chưa
                       # gán svg thì ${svg%.svg} sẽ rỗng -> ghi nhầm ra .png).
  if [[ "$base" == *lockup* ]]; then w=2621; h=1024; else w=1024; h=1024; fi
  sed -E "s/width=\"[0-9]+\" height=\"[0-9]+\"/width=\"$w\" height=\"$h\"/" "$OUT/$svg" > "$TMP/big.svg"
  sips -s format png "$TMP/big.svg" --out "$OUT/${base}.png" >/dev/null 2>&1
  [ "$jpeg" = "jpg" ] && sips -s format jpeg -s formatOptions 92 "$OUT/${base}.png" --out "$OUT/${base}.jpg" >/dev/null 2>&1
  return 0
}

for v in ink cream accent; do raster "logo-icon-$v.svg" jpg; done
for v in ink light accent; do raster "logo-mark-$v.svg" nojpg; done
for v in ink light; do raster "logo-lockup-$v.svg" nojpg; done

echo "Wrote $(ls "$OUT" | wc -l | tr -d ' ') files to public/brand/"
