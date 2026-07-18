import { useI18n } from '../i18n'
import { LINKS } from '../links'
import { LugoMark } from '../components/LugoMark'

export function Hero() {
  const { t } = useI18n()
  return (
    <section className="hero" data-surface="ink">
      <div className="hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">{t('hero.eyebrow')}</p>
          <h1 className="hero__title">{t('hero.title')}</h1>
          <p className="hero__sub">{t('hero.sub')}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={LINKS.getStarted}>
              {t('hero.cta')}
            </a>
            <a className="btn btn--secondary" href={LINKS.github}>
              {t('hero.secondary')}
            </a>
          </div>
        </div>

        <div className="hero__mark">
          <LugoMark state="idle" />
          <ul className="hero__legend" aria-hidden="true">
            <li>
              <span className="legend__swatch legend__swatch--dot" />
              {t('hero.legend.you')}
            </li>
            <li>
              <span className="legend__swatch legend__swatch--ring" />
              {t('hero.legend.lugo')}
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
