import { useI18n, type StringKey } from '../i18n'

const DEVICES = ['esp32', 'rpi', 'web'] as const

export function Devices() {
  const { t } = useI18n()
  return (
    <section id="devices" className="section devices">
      <div className="section__head">
        <p className="eyebrow">{t('devices.eyebrow')}</p>
        <h2 className="section__title">{t('devices.title')}</h2>
      </div>

      <ul className="dev-grid">
        {DEVICES.map((d) => (
          <li key={d} className="dev-card">
            <span className="dev-card__tag">{t(`dev.${d}.tag` as StringKey)}</span>
            <h3 className="dev-card__title">{t(`dev.${d}.title` as StringKey)}</h3>
            <p className="dev-card__body">{t(`dev.${d}.body` as StringKey)}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
