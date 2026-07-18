// Sinh frame SVG cho 4 trạng thái động của LugoMark, khớp ĐÚNG keyframe trong
// src/components/LugoMark.css. Frame được rasterize (sips) rồi ghép GIF (ffmpeg)
// trong scripts/gen-logo-anim.sh. Nền mực (#111) — bề mặt mạnh nhất của brand.
//
//   node scripts/gen-logo-anim.mjs <outDir> <fps>
//
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const OUT = process.argv[2]
const FPS = Number(process.argv[3] || 20)

// ---- Hình học (từ LugoMark.tsx) ----
const ROT = -19.4
const DOTX = 76.87, DOTY = 23.13
const INK = '#111111', CREAM = '#f7f4ee', ACCENT = '#ff8a00'
const RING = `cx="50" cy="50" r="38" fill="none" stroke-width="9" stroke-linecap="round" transform="rotate(${ROT} 50 50)"`

// ---- Easing: ease-in-out = cubic-bezier(.42,0,.58,1), áp cho từng đoạn keyframe ----
function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by
  const fx = (t) => ((ax * t + bx) * t + cx) * t
  const fy = (t) => ((ay * t + by) * t + cy) * t
  const dfx = (t) => (3 * ax * t + 2 * bx) * t + cx
  return (u) => {
    let t = u
    for (let i = 0; i < 8; i++) { const x = fx(t) - u; if (Math.abs(x) < 1e-6) break; const d = dfx(t); if (Math.abs(d) < 1e-6) break; t -= x / d }
    return fy(t)
  }
}
const easeInOut = bezier(0.42, 0, 0.58, 1)

// Nội suy theo danh sách stop {p, v}; áp easing trên từng đoạn (giống CSS keyframes).
function kf(stops, prog) {
  for (let i = 0; i < stops.length - 1; i++) {
    const a = stops[i], b = stops[i + 1]
    if (prog >= a.p && prog <= b.p) {
      const local = (prog - a.p) / (b.p - a.p)
      const e = easeInOut(local)
      return a.v + (b.v - a.v) * e
    }
  }
  return stops[stops.length - 1].v
}

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="512" height="512">
<rect width="100" height="100" fill="${INK}"/>
${inner}
</svg>`

// ---- Từng trạng thái: (prog 0..1) -> chuỗi inner SVG ----
const states = {
  // idle: cả dấu thở nhẹ scale 1 -> 1.04 -> 1
  idle: (prog) => {
    const s = kf([{ p: 0, v: 1 }, { p: 0.5, v: 1.04 }, { p: 1, v: 1 }], prog)
    return `<g transform="translate(50 50) scale(${s.toFixed(4)}) translate(-50 -50)">
  <circle ${RING} stroke="${CREAM}" stroke-dasharray="204.76 34"/>
  <circle cx="${DOTX}" cy="${DOTY}" r="6" fill="${ACCENT}" opacity="0.9"/>
</g>`
  },
  // listening: chấm cam đập theo giọng (scale không đều), vòng đứng yên
  listening: (prog) => {
    const sc = kf([{ p: 0, v: 1.2 }, { p: 0.25, v: 1.7 }, { p: 0.5, v: 1.35 }, { p: 0.75, v: 1.6 }, { p: 1, v: 1.2 }], prog)
    return `<circle ${RING} stroke="${CREAM}" stroke-dasharray="204.76 34"/>
<circle cx="${DOTX}" cy="${DOTY}" r="6" fill="${ACCENT}" transform="translate(${DOTX} ${DOTY}) scale(${sc.toFixed(4)}) translate(${-DOTX} ${-DOTY})"/>`
  },
  // thinking: đường cam->trắng tự vẽ quanh vòng (2 chiều), vòng nền ẩn
  thinking: (prog) => {
    const d0 = kf([{ p: 0, v: 0.01 }, { p: 0.25, v: 204.76 }, { p: 0.5, v: 0.01 }, { p: 0.75, v: 204.76 }, { p: 1, v: 0.01 }], prog)
    const d1 = kf([{ p: 0, v: 238.75 }, { p: 0.25, v: 34 }, { p: 0.5, v: 238.75 }, { p: 0.75, v: 34 }, { p: 1, v: 238.75 }], prog)
    const off = kf([{ p: 0, v: 0 }, { p: 0.25, v: 0 }, { p: 0.5, v: -204.75 }, { p: 0.75, v: 0 }, { p: 1, v: 0 }], prog)
    return `<defs><linearGradient id="lugo-runner" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a00"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs>
<circle ${RING} stroke="url(#lugo-runner)" stroke-dasharray="${d0.toFixed(2)} ${d1.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>
<circle cx="${DOTX}" cy="${DOTY}" r="6" fill="${ACCENT}"/>`
  },
  // speaking: vòng cam, khoảng hở khép–mở như đang nói; chấm mờ (như trên site)
  speaking: (prog) => {
    const d0 = kf([{ p: 0, v: 204.76 }, { p: 0.25, v: 180 }, { p: 0.5, v: 204.76 }, { p: 0.75, v: 180 }, { p: 1, v: 204.76 }], prog)
    const d1 = kf([{ p: 0, v: 34 }, { p: 0.25, v: 58.76 }, { p: 0.5, v: 34 }, { p: 0.75, v: 58.76 }, { p: 1, v: 34 }], prog)
    const off = kf([{ p: 0, v: 0 }, { p: 0.25, v: 0 }, { p: 0.5, v: 0 }, { p: 0.75, v: -24.76 }, { p: 1, v: 0 }], prog)
    return `<circle ${RING} stroke="${ACCENT}" stroke-dasharray="${d0.toFixed(2)} ${d1.toFixed(2)}" stroke-dashoffset="${off.toFixed(2)}"/>
<circle cx="${DOTX}" cy="${DOTY}" r="6" fill="${CREAM}" opacity="0.35"/>`
  },
}

// Chu kỳ mỗi state (giây) — khớp duration trong CSS
const PERIOD = { idle: 5.5, listening: 1.0, thinking: 2.8, speaking: 1.9 }

// Bao nhiêu chu kỳ cho từng file gif riêng (để nhìn đủ 1 vòng đẹp)
const LOOPS = { idle: 1, listening: 2, thinking: 1, speaking: 1 }

rmSync(OUT, { recursive: true, force: true })

for (const [name, fn] of Object.entries(states)) {
  const dir = join(OUT, name)
  mkdirSync(dir, { recursive: true })
  const nPer = Math.round(PERIOD[name] * FPS)   // frame / 1 chu kỳ
  const total = nPer * LOOPS[name]
  for (let i = 0; i < total; i++) {
    const prog = (i % nPer) / nPer
    writeFileSync(join(dir, `f${String(i).padStart(4, '0')}.svg`), svg(fn(prog)))
  }
  console.log(`${name}: ${total} frames (${nPer}/chu kỳ)`)
}

// Kịch bản "cycle" — kể chuyện: idle -> listening -> thinking -> speaking
const cycleDir = join(OUT, 'cycle')
mkdirSync(cycleDir, { recursive: true })
const script = [
  ['idle', 2.0], ['listening', 2.0], ['thinking', 2.8], ['speaking', 1.9],
]
let k = 0
for (const [name, secs] of script) {
  const nPer = Math.round(PERIOD[name] * FPS)
  const frames = Math.round(secs * FPS)
  for (let i = 0; i < frames; i++) {
    const prog = (i % nPer) / nPer
    writeFileSync(join(cycleDir, `f${String(k++).padStart(4, '0')}.svg`), svg(states[name](prog)))
  }
}
console.log(`cycle: ${k} frames`)
console.log(`FPS=${FPS}`)
