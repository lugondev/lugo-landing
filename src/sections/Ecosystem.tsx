import { useI18n, type StringKey } from '../i18n'

// 10 module từ brand brief. Companion đứng đầu (cái người dùng gặp), phần còn
// lại là hạ tầng đỡ nó — nên Companion được nhấn to hơn một bậc.
const MODULES = [
  'companion',
  'studio',
  'cloud',
  'voice',
  'vision',
  'memory',
  'connect',
  'skills',
  'devices',
  'console',
] as const

export function Ecosystem() {
  const { t } = useI18n()
  return (
    <section id="ecosystem" className="section ecosystem">
      <div className="section__head">
        <p className="eyebrow">{t('eco.eyebrow')}</p>
        <h2 className="section__title">{t('eco.title')}</h2>
        <p className="section__sub">{t('eco.sub')}</p>
      </div>

      <ul className="eco-grid">
        {MODULES.map((m, i) => (
          <li key={m} className="eco-card" data-lead={i === 0}>
            <span className="eco-card__name">
              <span className="eco-card__prefix">LUGO</span>{' '}
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </span>
            <span className="eco-card__desc">{t(`eco.${m}` as StringKey)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
