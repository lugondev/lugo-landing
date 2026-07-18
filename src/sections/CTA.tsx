import { useI18n } from '../i18n'
import { LINKS } from '../links'

export function CTA() {
  const { t } = useI18n()
  return (
    <section className="section cta" data-surface="ink">
      <div className="cta__inner">
        <h2 className="cta__title">{t('cta.title')}</h2>
        <p className="cta__sub">{t('cta.sub')}</p>
        <div className="cta__actions">
          <a className="btn btn--primary" href={LINKS.getStarted}>
            {t('cta.primary')}
          </a>
          <a className="btn btn--secondary" href={LINKS.github}>
            {t('cta.secondary')}
          </a>
        </div>
      </div>
    </section>
  )
}
