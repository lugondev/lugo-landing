// Xuất SVG ĐỘNG, nền TRONG SUỐT, tự chứa (nhúng @keyframes) cho 4 trạng thái
// LugoMark. Chuyển động là CSS y hệt src/components/LugoMark.css nên chạy đúng
// trong trình duyệt. Ring dùng currentColor (mặc định mực cho nền sáng; đặt
// style="color:#f7f4ee" khi để trên nền tối). Tôn trọng prefers-reduced-motion.
//
//   node scripts/gen-logo-anim-svg.mjs
//
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'brand')
const RING = 'cx="50" cy="50" r="38" fill="none" stroke-width="9" stroke-linecap="round" transform="rotate(-19.4 50 50)"'
const DOT = 'cx="76.87" cy="23.13" r="6"'
const RM = '@media(prefers-reduced-motion:reduce){*{animation:none!important}}'

const wrap = (inner, css) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="120" height="120" role="img" aria-label="LUGO" style="color:#111111">
<style>${css}${RM}</style>
${inner}
</svg>
`

const files = {
  // idle: cả dấu thở nhẹ 1 -> 1.04 -> 1
  'logo-anim-idle.svg': wrap(
    `<g class="brz"><circle ${RING} stroke="currentColor" stroke-dasharray="204.76 34"/><circle ${DOT} fill="#ff8a00" opacity=".9"/></g>`,
    `.brz{transform-box:view-box;transform-origin:50px 50px;animation:brz 5.5s ease-in-out infinite}@keyframes brz{0%,100%{transform:scale(1)}50%{transform:scale(1.04)}}`,
  ),
  // listening: chấm cam đập theo giọng
  'logo-anim-listening.svg': wrap(
    `<circle ${RING} stroke="currentColor" stroke-dasharray="204.76 34"/><circle class="dot" ${DOT} fill="#ff8a00"/>`,
    `.dot{transform-box:view-box;transform-origin:76.87px 23.13px;animation:spk 1s ease-in-out infinite}@keyframes spk{0%{transform:scale(1.2)}25%{transform:scale(1.7)}50%{transform:scale(1.35)}75%{transform:scale(1.6)}100%{transform:scale(1.2)}}`,
  ),
  // thinking: đường cam->trắng tự vẽ quanh vòng (nền vòng ẩn). Hợp nền TỐI.
  'logo-anim-thinking.svg': wrap(
    `<defs><linearGradient id="lugo-runner" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a00"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><circle class="run" ${RING} stroke="url(#lugo-runner)"/><circle ${DOT} fill="#ff8a00"/>`,
    `.run{animation:draw 2.8s ease-in-out infinite}@keyframes draw{0%{stroke-dasharray:0.01 238.75;stroke-dashoffset:0}25%{stroke-dasharray:204.76 34;stroke-dashoffset:0}50%{stroke-dasharray:0.01 238.75;stroke-dashoffset:-204.75}75%{stroke-dasharray:204.76 34;stroke-dashoffset:0}100%{stroke-dasharray:0.01 238.75;stroke-dashoffset:0}}`,
  ),
  // speaking: vòng cam, khoảng hở khép–mở như đang nói
  'logo-anim-speaking.svg': wrap(
    `<circle class="mouth" ${RING} stroke="#ff8a00"/><circle ${DOT} fill="currentColor" opacity=".35"/>`,
    `.mouth{animation:mouth 1.9s ease-in-out infinite}@keyframes mouth{0%{stroke-dasharray:204.76 34;stroke-dashoffset:0}25%{stroke-dasharray:180 58.76;stroke-dashoffset:0}50%{stroke-dasharray:204.76 34;stroke-dashoffset:0}75%{stroke-dasharray:180 58.76;stroke-dashoffset:-24.76}100%{stroke-dasharray:204.76 34;stroke-dashoffset:0}}`,
  ),
}

for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content)
  console.log(`  -> ${name}`)
}
