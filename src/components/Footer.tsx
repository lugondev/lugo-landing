import { useI18n } from '../i18n'
import { LINKS } from '../links'
import { LugoMark } from './LugoMark'

export function Footer() {
  const { t } = useI18n()
  return (
    <footer className="footer" data-surface="ink">
      <div className="footer__inner">
        <div className="footer__brand">
          <span className="footer__mark" aria-hidden="true">
            <LugoMark state="idle" />
          </span>
          <div>
            <p className="footer__word">LUGO</p>
            <p className="footer__tagline">{t('footer.tagline')}</p>
          </div>
        </div>
        <div className="footer__meta">
          <a href={LINKS.github}>GitHub</a>
          <span className="footer__rights">{t('footer.rights')}</span>
        </div>
      </div>
    </footer>
  )
}
