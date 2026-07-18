import './LugoMark.css'

// Trạng thái nhận diện Lugo — cùng ngữ nghĩa với lugo-web-client: chấm là BẠN,
// vòng là LUGO. Landing không có âm thanh thật nên chuyển động do CSS lo, không
// phải JS đo mức tiếng.
export type MarkState = 'idle' | 'listening' | 'thinking' | 'speaking'

const R = 38
const CIRC = 2 * Math.PI * R // 238.76
const GAP = 46 // độ dài khoảng hở trên chu vi -> ~70 độ
const DASH = CIRC - GAP

// Chấm nằm giữa khoảng hở: góc -45 độ, bán kính R.
const DOT_X = 50 + R * Math.cos(-Math.PI / 4)
const DOT_Y = 50 + R * Math.sin(-Math.PI / 4)

// rotate(-10): <circle> vẽ từ 3 giờ, thuận chiều kim đồng hồ. Với dasharray này
// khoảng hở tự nằm ~-35 độ; xoay thêm -10 đưa nó về đúng -45 độ, trùng chấm.
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
          transform="rotate(-10 50 50)"
        />
      </g>
      <circle className="mark__dot" cx={DOT_X} cy={DOT_Y} r="7" />
    </svg>
  )
}
