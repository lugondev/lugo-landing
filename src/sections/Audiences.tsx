import { useI18n, type StringKey } from '../i18n'

const WHO = ['individual', 'developers', 'businesses', 'makers'] as const

export function Audiences() {
  const { t } = useI18n()
  return (
    <section className="section audiences">
      <div className="section__head">
        <p className="eyebrow">{t('who.eyebrow')}</p>
        <h2 className="section__title">{t('who.title')}</h2>
      </div>

      <ul className="who-grid">
        {WHO.map((w) => (
          <li key={w} className="who-card">
            <h3 className="who-card__title">{t(`who.${w}.title` as StringKey)}</h3>
            <p className="who-card__body">{t(`who.${w}.body` as StringKey)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
