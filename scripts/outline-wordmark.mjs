// Outline chữ "LUGO" từ Be Vietnam Pro weight 800 thành path SVG, để dán vào
// LUGO_PATH trong scripts/gen-logo.sh. Nhờ dùng path vector, PNG/JPEG lockup
// không phụ thuộc font cài trên máy (sips rasterize không có Be Vietnam Pro sẽ
// rơi về font hệ thống — sai chữ). Chỉ chạy lại khi đổi wordmark/weight/size.
//
//   npm i -D opentype.js   # hoặc: npx --yes opentype.js không có CLI, cần cài
//   node scripts/outline-wordmark.mjs
//
import opentype from 'opentype.js'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const woff = join(root, 'node_modules/@fontsource/be-vietnam-pro/files/be-vietnam-pro-latin-800-normal.woff')
const buf = readFileSync(woff)
const font = opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength))

const SIZE = 46 // khớp viewBox 0 0 256 100 của lockup
const path = font.getPath('LUGO', 0, 0, SIZE, { letterSpacing: 0.02 })
const bb = path.getBoundingBox()

console.log('d =', path.toPathData(2))
console.log('bbox =', bb)
// Canh: đặt chữ sau mark (x≈112) và giữa dọc (y=50).
//   translateX = 112 - bb.x1   ; translateY = 50 - (bb.y1 + bb.y2) / 2
console.log('translate =', (112 - bb.x1).toFixed(2), (50 - (bb.y1 + bb.y2) / 2).toFixed(2))
