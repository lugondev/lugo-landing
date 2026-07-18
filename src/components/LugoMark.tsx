import './LugoMark.css'

// Trạng thái nhận diện Lugo — cùng ngữ nghĩa với lugo-web-client: chấm là BẠN,
// vòng là LUGO. Landing không có âm thanh thật nên chuyển động do CSS lo, không
// phải JS đo mức tiếng.
export type MarkState = 'idle' | 'listening' | 'thinking' | 'speaking'

const R = 38
const CIRC = 2 * Math.PI * R // 238.76
const GAP = 34 // độ dài khoảng hở trên chu vi -> ~51 độ. Hở vừa đủ để chấm CHÈN
// vào, không phải một khe rộng khiến chấm trông như đang lơ lửng bên ngoài.
const DASH = CIRC - GAP

// Chấm NẰM TRÊN chính đường tròn của vòng: cùng tâm (50,50), cùng bán kính R,
// tại góc -45 độ (hướng 1:30, trên-phải). Nhờ đó chấm và nét vòng đúng một
// đường tròn — chấm bịt kín khoảng hở chứ không trôi ra ngoài.
const DOT_ANGLE = -45 // độ (quy ước toán học; trên màn hình = trên-phải)
const DOT_X = 50 + R * Math.cos((DOT_ANGLE * Math.PI) / 180)
const DOT_Y = 50 + R * Math.sin((DOT_ANGLE * Math.PI) / 180)

// <circle> vẽ từ 3 giờ, thuận chiều kim đồng hồ; với dasharray này TÂM khoảng
// hở nằm ở GAP_CENTER độ. Xoay đúng bằng ROT để tâm khoảng hở trùng góc chấm,
// nên chấm luôn ngồi CHÍNH GIỮA khe. Đổi R hay GAP thì ROT tự tính lại.
const GAP_CENTER = ((DASH / CIRC) * 360 + 360) / 2
const ROT = 360 + DOT_ANGLE - GAP_CENTER // ~-19.4

export function LugoMark({ state = 'idle' }: { state?: MarkState }) {
  return (
    <svg className="mark" data-state={state} viewBox="0 0 100 100" role="img" aria-hidden="true">
      <g className="mark__ringwrap">
        <circle
          className="mark__ring"
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={`${DASH} ${GAP}`}
          transform={`rotate(${ROT} 50 50)`}
        />
      </g>
      <circle className="mark__dot" cx={DOT_X} cy={DOT_Y} r="6" />
    </svg>
  )
}
