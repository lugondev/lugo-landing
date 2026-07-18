import { useI18n, type StringKey } from '../i18n'
import { LugoMark, type MarkState } from '../components/LugoMark'

const STEPS: { n: string; key: string; state: MarkState }[] = [
  { n: '1', key: 'how.1', state: 'listening' },
  { n: '2', key: 'how.2', state: 'thinking' },
  { n: '3', key: 'how.3', state: 'speaking' },
]

// Nền tối, giống màn Talk — chỗ duy nhất trong trang tái dùng đúng các trạng
// thái thật của LugoMark. Đây là "chữ ký" của trang.
export function HowItWorks() {
  const { t } = useI18n()
  return (
    <section className="section how" data-surface="ink">
      <div className="section__head">
        <p className="eyebrow">{t('how.eyebrow')}</p>
        <h2 className="section__title">{t('how.title')}</h2>
        <p className="section__sub">{t('how.sub')}</p>
      </div>

      <ol className="how-grid">
        {STEPS.map((s) => (
          <li key={s.n} className="how-step">
            <div className="how-step__mark">
              <LugoMark state={s.state} />
            </div>
            <div className="how-step__body">
              <span className="how-step__n" aria-hidden="true">
                {s.n}
              </span>
              <h3 className="how-step__title">{t(`${s.key}.title` as StringKey)}</h3>
              <p className="how-step__text">{t(`${s.key}.body` as StringKey)}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
