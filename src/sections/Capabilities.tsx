import { useI18n, type StringKey } from '../i18n'

const CAPS: { key: string; icon: string }[] = [
  { key: 'understand', icon: '◠' },
  { key: 'remember', icon: '❖' },
  { key: 'communicate', icon: '❝' },
  { key: 'act', icon: '➤' },
  { key: 'connect', icon: '⌘' },
  { key: 'everywhere', icon: '⌾' },
]

export function Capabilities() {
  const { t } = useI18n()
  return (
    <section id="companion" className="section capabilities">
      <div className="section__head">
        <p className="eyebrow">{t('cap.eyebrow')}</p>
        <h2 className="section__title">{t('cap.title')}</h2>
      </div>

      <ul className="cap-grid">
        {CAPS.map((c) => (
          <li key={c.key} className="cap-card">
            <span className="cap-card__icon" aria-hidden="true">
              {c.icon}
            </span>
            <h3 className="cap-card__title">{t(`cap.${c.key}.title` as StringKey)}</h3>
            <p className="cap-card__body">{t(`cap.${c.key}.body` as StringKey)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
