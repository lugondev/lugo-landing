#!/bin/bash
# Icon phản hồi info / error / success — MANG NHẬN DIỆN LUGO: dùng đúng vòng HỞ
# + chấm cam "bạn" ngồi trong khe (chữ ký của mark), ký hiệu status ở giữa.
# Vòng + ký hiệu = màu semantic; chấm giữ CAM làm điểm neo thương hiệu.
# Nét tròn (round cap/join), nền trong suốt. Xuất SVG + PNG (@512, sips).
#
#   bash scripts/gen-status-icons.sh
#
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public/brand"
TMP="$(mktemp -d)"
mkdir -p "$OUT"

INFO="#2f6df0"; ERROR="#c9372c"; SUCCESS="#1f9d55"; WARNING="#e8a317"

# Vòng HỞ + chấm cam — giống hệt hình học mark LUGO (r38, sw9, khe 34, xoay -19.4,
# chấm ở khe tại 76.87,23.13). Vòng tô màu semantic; chấm luôn cam.
mark () { echo "<circle cx=\"50\" cy=\"50\" r=\"38\" fill=\"none\" stroke=\"$1\" stroke-width=\"9\" stroke-linecap=\"round\" stroke-dasharray=\"204.76 34\" transform=\"rotate(-19.4 50 50)\"/><circle cx=\"76.87\" cy=\"23.13\" r=\"6\" fill=\"#ff8a00\"/>"; }
SW='stroke-width="8.5" stroke-linecap="round" stroke-linejoin="round"'

icon () { # file color glyph
  cat > "$OUT/$1" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="256" height="256" role="img">
  $(mark "$2")
  $3
</svg>
EOF
}

# Ký hiệu đặt CHÍNH GIỮA, gọn trong vòng, tránh chấm cam ở góc trên-phải.
# info: chấm + nét dọc "i"
icon icon-info.svg "$INFO" \
"<circle cx=\"48\" cy=\"38\" r=\"4\" fill=\"$INFO\"/><line x1=\"48\" y1=\"49\" x2=\"48\" y2=\"66\" stroke=\"$INFO\" $SW/>"

# error: dấu ✕ (cân giữa)
icon icon-error.svg "$ERROR" \
"<line x1=\"40\" y1=\"42\" x2=\"58\" y2=\"60\" stroke=\"$ERROR\" $SW/><line x1=\"58\" y1=\"42\" x2=\"40\" y2=\"60\" stroke=\"$ERROR\" $SW/>"

# success: dấu ✓ (đầu tick hạ thấp để không chạm chấm cam)
icon icon-success.svg "$SUCCESS" \
"<polyline points=\"35,52 45,62 62,44\" fill=\"none\" stroke=\"$SUCCESS\" $SW/>"

# warning: dấu "!" (nét dọc + chấm dưới)
icon icon-warning.svg "$WARNING" \
"<line x1=\"48\" y1=\"36\" x2=\"48\" y2=\"56\" stroke=\"$WARNING\" $SW/><circle cx=\"48\" cy=\"66\" r=\"4\" fill=\"$WARNING\"/>"

# Rasterize PNG @512 (nền trong suốt)
for n in info error success warning; do
  sed -E 's/width="[0-9]+" height="[0-9]+"/width="512" height="512"/' "$OUT/icon-$n.svg" > "$TMP/b.svg"
  sips -s format png "$TMP/b.svg" --out "$OUT/icon-$n.png" >/dev/null 2>&1
done

echo "Wrote icon-{info,error,success,warning}.{svg,png}"
