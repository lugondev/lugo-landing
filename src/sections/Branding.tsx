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
