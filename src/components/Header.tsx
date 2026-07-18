import { useEffect, useState } from 'react'
import { useI18n } from '../i18n'
import { LINKS } from '../links'
import { LugoMark } from './LugoMark'

// Header trong suốt trên hero tối; khi cuộn xuống vùng kem thì đặc lại để chữ
// vẫn đọc được. Ngưỡng 12px đủ để phân biệt "đang ở đỉnh" với "đã cuộn".
export function Header() {
  const { t, lang, setLang } = useI18n()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="header" data-scrolled={scrolled}>
      <a className="header__brand" href="#top" aria-label="LUGO">
        <span className="header__mark" aria-hidden="true">
          <LugoMark state="idle" />
        </span>
        <span className="header__word">LUGO</span>
      </a>

      <nav className="header__nav" aria-label="Sections">
        <a href="#companion">{t('nav.what')}</a>
        {/* <a href="#ecosystem">{t('nav.ecosystem')}</a> tạm ẩn */}
        <a href="#devices">{t('nav.devices')}</a>
      </nav>

      <div className="header__actions">
        <button
          className="header__lang"
          onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
          aria-label={t('lang.toggle.aria')}
        >
          {t('lang.toggle')}
        </button>
        <a className="btn btn--primary btn--sm" href={LINKS.getStarted}>
          {t('nav.cta')}
        </a>
      </div>
    </header>
  )
}
