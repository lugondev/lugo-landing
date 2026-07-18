#!/bin/bash
# Sinh ảnh Open Graph / social preview (1200×630) vào public/og-image.{svg,png,jpg}.
# Cùng pipeline với gen-logo.sh: dựng SVG nguồn rồi rasterize bằng `sips` (macOS).
# Chữ "LUGO" dùng path đã OUTLINE (font-independent); phần tagline dùng path
# outline sinh kèm để PNG không phụ thuộc font cài trên máy.
#
#   bash scripts/gen-og.sh
#
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/public"
TMP="$(mktemp -d)"

INK="#111111"
CREAM="#f7f4ee"
ACCENT="#ff8a00"
WARM="#ffc857"

# Hình học mark chuẩn (khớp LugoMark.tsx / favicon).
RING='cx="50" cy="50" r="38" fill="none" stroke-width="9" stroke-linecap="round" stroke-dasharray="204.76 34" transform="rotate(-19.4 50 50)"'
DOT='cx="76.87" cy="23.13" r="6"'

# "LUGO" outline (Be Vietnam Pro 800), baseline y=0, x bắt đầu ~2.94.
LUGO_PATH='M27.28 0L2.94 0L2.94-34.04L10.90-34.04L10.90-6.90L27.28-6.90L27.28 0M47.89 0.46Q45.17 0.46 42.64-0.30Q40.11-1.06 38.11-2.71Q36.11-4.37 34.94-7.04Q33.76-9.71 33.76-13.48L33.76-34.04L41.72-34.04L41.72-13.48Q41.72-10.76 43.22-8.90Q44.71-7.04 47.89-7.04Q51.06-7.04 52.55-8.90Q54.05-10.76 54.05-13.48L54.05-34.04L62.01-34.04L62.01-13.48Q62.01-9.71 60.84-7.04Q59.66-4.37 57.66-2.71Q55.66-1.06 53.13-0.30Q50.60 0.46 47.89 0.46M84.87 0.46Q80.55 0.46 77.28-1.01Q74.01-2.48 71.83-4.99Q69.64-7.50 68.56-10.60Q67.48-13.71 67.48-16.97Q67.48-20.24 68.59-23.37Q69.69-26.50 71.88-29Q74.06-31.51 77.37-33.01Q80.68-34.50 85.10-34.50Q88.60-34.50 91.08-33.63Q93.56-32.75 95.24-31.37Q96.92-29.99 97.96-28.45Q98.99-26.91 99.52-25.55Q100.05-24.20 100.21-23.32Q100.37-22.45 100.37-22.45L92.46-22.45Q92.46-22.45 92.21-23.21Q91.95-23.97 91.19-24.98Q90.44-25.99 88.96-26.75Q87.49-27.51 85.10-27.51Q81.97-27.51 79.88-25.99Q77.79-24.47 76.73-22.08Q75.67-19.69 75.67-17.11Q75.67-14.44 76.75-12.03Q77.83-9.61 79.95-8.05Q82.06-6.49 85.19-6.49Q88.50-6.49 90.46-8.10Q92.41-9.71 92.87-12.37L84.46-12.37L84.46-18.58L100.74-18.58L100.74-15.87Q100.74-10.49 98.69-6.85Q96.65-3.22 93.06-1.38Q89.47 0.46 84.87 0.46M122.36 0.46Q117.99 0.46 114.72-1.03Q111.46-2.53 109.27-5.04Q107.09-7.54 105.98-10.67Q104.88-13.80 104.88-17.07Q104.88-20.33 105.98-23.44Q107.09-26.54 109.27-29.03Q111.46-31.51 114.72-33.01Q117.99-34.50 122.36-34.50Q126.68-34.50 129.95-33.01Q133.22-31.51 135.40-29.03Q137.59-26.54 138.69-23.44Q139.79-20.33 139.79-17.07Q139.79-13.80 138.69-10.67Q137.59-7.54 135.40-5.04Q133.22-2.53 129.95-1.03Q126.68 0.46 122.36 0.46M122.36-6.67Q125.35-6.67 127.40-8.19Q129.44-9.71 130.48-12.07Q131.51-14.44 131.51-17.07Q131.51-19.64 130.48-22.01Q129.44-24.38 127.40-25.90Q125.35-27.42 122.36-27.42Q119.32-27.42 117.28-25.90Q115.23-24.38 114.22-22.01Q113.21-19.64 113.21-17.07Q113.21-14.44 114.22-12.07Q115.23-9.71 117.28-8.19Q119.32-6.67 122.36-6.67'

cat > "$OUT/og-image.svg" <<EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630" font-family="'Be Vietnam Pro', 'Helvetica Neue', Arial, sans-serif">
  <defs>
    <radialGradient id="glow" cx="82%" cy="20%" r="70%">
      <stop offset="0" stop-color="$ACCENT" stop-opacity="0.28"/>
      <stop offset="0.55" stop-color="$ACCENT" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="hair" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="$ACCENT"/>
      <stop offset="1" stop-color="$WARM"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="$INK"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Ghost mark, đặt tràn mép phải như hoạ tiết -->
  <g transform="translate(905 315) scale(5.4) translate(-50 -50)" opacity="0.10">
    <circle $RING stroke="$CREAM"/>
    <circle $DOT fill="$ACCENT"/>
  </g>

  <!-- Khối nội dung trái -->
  <g transform="translate(96 236)">
    <!-- eyebrow -->
    <rect x="0" y="-52" width="34" height="3" rx="1.5" fill="url(#hair)"/>
    <text x="46" y="-46" fill="$WARM" font-size="21" font-weight="600" letter-spacing="3">NỀN TẢNG AI COMPANION</text>

    <!-- Lockup: mark + wordmark (scale 1.9) -->
    <g transform="scale(1.9)">
      <circle $RING stroke="$CREAM"/>
      <circle $DOT fill="$ACCENT"/>
      <path transform="translate(118 67.02)" fill="$CREAM" d="$LUGO_PATH"/>
    </g>

    <!-- tagline -->
    <text x="2" y="286" fill="$CREAM" font-size="42" font-weight="700">AI Companion của riêng mỗi người.</text>
    <text x="2" y="330" fill="#b9b3a8" font-size="24" font-weight="400">Mô hình cung cấp trí tuệ. LUGO cung cấp trải nghiệm.</text>
  </g>

  <text x="96" y="586" fill="#8a857c" font-size="20" font-weight="600" letter-spacing="1">lugo.vn</text>
  <text x="1104" y="586" text-anchor="end" fill="#8a857c" font-size="20" font-weight="400">Tiếng Việt · English</text>
</svg>
EOF

# Rasterize 1200×630 → PNG, rồi JPEG (nền đặc nên JPEG hợp lệ, nhẹ hơn cho share).
sips -s format png "$OUT/og-image.svg" --out "$OUT/og-image.png" >/dev/null 2>&1
sips -s format jpeg -s formatOptions 90 "$OUT/og-image.png" --out "$OUT/og-image.jpg" >/dev/null 2>&1

echo "Wrote og-image.{svg,png,jpg} to public/ ($(sips -g pixelWidth -g pixelHeight "$OUT/og-image.png" 2>/dev/null | tail -2 | tr '\n' ' '))"
