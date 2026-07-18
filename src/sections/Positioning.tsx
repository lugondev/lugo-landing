import { useI18n } from '../i18n'

// Sơ đồ 3 tầng từ brand brief: mô hình nền tảng -> LUGO -> companion đời thực.
// Tầng LUGO ở giữa được nhấn (cam) vì đó là chỗ thương hiệu đứng.
export function Positioning() {
  const { t } = useI18n()
  const layers = [
    { key: 'layer1', tone: 'muted' as const },
    { key: 'layer2', tone: 'accent' as const },
    { key: 'layer3', tone: 'muted' as const },
  ]
  return (
    <section className="section positioning">
      <div className="section__head">
        <p className="eyebrow">{t('pos.eyebrow')}</p>
        <h2 className="section__title">{t('pos.title')}</h2>
        <p className="section__sub">{t('pos.sub')}</p>
      </div>

      <ol className="stack" aria-label={t('pos.title')}>
        {layers.map((l, i) => (
          <li key={l.key} className="stack__layer" data-tone={l.tone}>
            <span className="stack__label">{t(`pos.${l.key}.label` as never)}</span>
            <span className="stack__items">{t(`pos.${l.key}.items` as never)}</span>
            {i < layers.length - 1 && (
              <span className="stack__flow" aria-hidden="true">
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>

      <p className="positioning__caption">{t('pos.caption')}</p>
    </section>
  )
}
