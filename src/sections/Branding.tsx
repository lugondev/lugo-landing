import { useI18n, type StringKey } from '../i18n'
import { LugoMark, type MarkState } from '../components/LugoMark'

// Bốn ý nghĩa từ brand sheet. 'dot' dùng state listening để chấm nở to (nhấn
// "bạn"); 'gap'/'color' được nhấn bằng CSS (mờ vòng / vòng cam) trong landing.css.
const MEANINGS: { key: string; variant: string; state: MarkState }[] = [
  { key: 'ring', variant: 'ring', state: 'idle' },
  { key: 'dot', variant: 'dot', state: 'listening' },
  { key: 'gap', variant: 'gap', state: 'idle' },
  { key: 'color', variant: 'color', state: 'idle' },
]

const SWATCHES: { hex: string; name: StringKey }[] = [
  { hex: '#111111', name: 'brand.swatch.ink' },
  { hex: '#2A2A2A', name: 'brand.swatch.graphite' },
  { hex: '#F7F4EE', name: 'brand.swatch.cream' },
  { hex: '#E8E1D6', name: 'brand.swatch.sand' },
  { hex: '#FF8A00', name: 'brand.swatch.accent' },
  { hex: '#FFC857', name: 'brand.swatch.warm' },
]

// Icon phản hồi mang nhận diện LUGO: vòng HỞ + chấm cam "bạn" (giống mark), ký
// hiệu status ở giữa. Vòng + ký hiệu = màu semantic; chấm luôn cam.
const STATUS = [
  { key: 'info', color: 'var(--lugo-info)' },
  { key: 'success', color: 'var(--lugo-success)' },
  { key: 'warning', color: 'var(--lugo-warning)' },
  { key: 'error', color: 'var(--lugo-danger)' },
] as const

function StatusIcon({ variant, color }: { variant: string; color: string }) {
  const glyph =
    variant === 'info' ? (
      <>
        <circle cx="48" cy="38" r="4" fill={color} />
        <line x1="48" y1="49" x2="48" y2="66" stroke={color} strokeWidth="8.5" strokeLinecap="round" />
      </>
    ) : variant === 'error' ? (
      <>
        <line x1="40" y1="42" x2="58" y2="60" stroke={color} strokeWidth="8.5" strokeLinecap="round" />
        <line x1="58" y1="42" x2="40" y2="60" stroke={color} strokeWidth="8.5" strokeLinecap="round" />
      </>
    ) : variant === 'warning' ? (
      <>
        <line x1="48" y1="36" x2="48" y2="56" stroke={color} strokeWidth="8.5" strokeLinecap="round" />
        <circle cx="48" cy="66" r="4" fill={color} />
      </>
    ) : (
      <polyline points="35,52 45,62 62,44" fill="none" stroke={color} strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
    )
  return (
    <svg className="status-icon" viewBox="0 0 100 100" role="img" aria-hidden="true">
      <circle
        cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="9"
        strokeLinecap="round" strokeDasharray="204.76 34" transform="rotate(-19.4 50 50)"
      />
      <circle cx="76.87" cy="23.13" r="6" fill="var(--lugo-accent)" />
      {glyph}
    </svg>
  )
}

function Lockup({ variant }: { variant: string }) {
  return (
    <span className={`lockup lockup--${variant}`}>
      <span className="lockup__mark">
        <LugoMark state="idle" />
      </span>
      <span className="lockup__word">LUGO</span>
    </span>
  )
}

export function Branding() {
  const { t } = useI18n()
  return (
    <section id="brand" className="section branding">
      <div className="section__head">
        <p className="eyebrow">{t('brand.eyebrow')}</p>
        <h2 className="section__title">{t('brand.title')}</h2>
        <p className="section__sub">{t('brand.sub')}</p>
      </div>

      <div className="brand-grid">
        {/* Ý nghĩa logo */}
        <div className="brand-block brand-block--meaning">
          <p className="brand-block__label">{t('brand.meaning.label')}</p>
          <ul className="meaning-list">
            {MEANINGS.map((m) => (
              <li key={m.key} className={`meaning meaning--${m.variant}`}>
                <span className="meaning__mark">
                  <LugoMark state={m.state} />
                </span>
                <div className="meaning__text">
                  <h3 className="meaning__title">{t(`brand.${m.key}.title` as StringKey)}</h3>
                  <p className="meaning__body">{t(`brand.${m.key}.body` as StringKey)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* App icon + đơn sắc */}
        <div className="brand-block brand-block--apps">
          <p className="brand-block__label">{t('brand.icons.label')}</p>
          <div className="app-icons">
            <span className="app-icon app-icon--cream">
              <LugoMark state="idle" />
            </span>
            <span className="app-icon app-icon--ink">
              <LugoMark state="idle" />
            </span>
            <span className="app-icon app-icon--accent">
              <LugoMark state="idle" />
            </span>
          </div>

          <p className="brand-block__label brand-block__label--gap">{t('brand.mono.label')}</p>
          <div className="mono-row">
            <Lockup variant="ink" />
            <Lockup variant="muted" />
            <Lockup variant="invert" />
          </div>
        </div>
      </div>

      {/* Icon phản hồi — mang nhận diện LUGO */}
      <div className="brand-block brand-block--status">
        <p className="brand-block__label">{t('brand.status.label')}</p>
        <ul className="status-row">
          {STATUS.map((s) => (
            <li key={s.key} className="status">
              <span className="status__mark">
                <StatusIcon variant={s.key} color={s.color} />
              </span>
              <span className="status__name">{t(`brand.status.${s.key}` as StringKey)}</span>
            </li>
          ))}
        </ul>
        <p className="status-note">{t('brand.status.note')}</p>
      </div>

      {/* Bảng màu chủ đạo */}
      <div className="brand-block brand-block--palette">
        <p className="brand-block__label">{t('brand.palette.label')}</p>
        <ul className="palette">
          {SWATCHES.map((s) => (
            <li key={s.hex} className="swatch">
              <span className="swatch__chip" style={{ background: s.hex }} />
              <span className="swatch__name">{t(s.name)}</span>
              <span className="swatch__hex">{s.hex}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
