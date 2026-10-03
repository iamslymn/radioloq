import { Button } from './Button'
import { ArrowRight, Check } from './Icon'
import './PriceTable.css'

export type Tier = {
  key: string
  tier: string
  name: string
  price: number
  per: string
  desc: string
  features: string[]
  cta: string
  flag?: string
  recommended?: boolean
}

type Props = {
  tiers: Tier[]
  currency?: string
  onSelect: (key: string) => void
}

export function PriceTable({ tiers, currency = '€', onSelect }: Props) {
  return (
    <div className="prices" role="list">
      {tiers.map((t) => (
        <article
          key={t.key}
          role="listitem"
          className="prices__col"
          data-recommended={t.recommended || undefined}
          aria-labelledby={`tier-${t.key}`}
        >
          <header className="prices__head">
            <span className="t-label">{t.tier}</span>
            {t.flag && <span className="prices__flag t-label">{t.flag}</span>}
          </header>

          <div className="prices__cell">
            <h3 className="prices__name" id={`tier-${t.key}`}>
              {t.name}
            </h3>
            <p className="prices__amount">
              <span className="prices__currency">{currency}</span>
              <span className="prices__value t-num">{t.price}</span>
              <span className="prices__per t-small faint">{t.per}</span>
            </p>
          </div>

          <p className="prices__cell prices__desc t-small muted">{t.desc}</p>

          <ul className="prices__cell prices__features">
            {t.features.map((f) => (
              <li key={f} className="t-small">
                <Check size={16} className="prices__check" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="prices__cell prices__action">
            <Button
              block
              variant={t.recommended ? 'primary' : 'secondary'}
              icon={<ArrowRight />}
              onClick={() => onSelect(t.key)}
            >
              {t.cta}
            </Button>
          </div>
        </article>
      ))}
    </div>
  )
}
