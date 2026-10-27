import { Button, TextLink } from '../components/Button'
import { ArrowRight } from '../components/Icon'
import { Starburst } from '../components/StarburstMark'
import { type Content, links } from '../content'
import { stagger } from '../lib/stagger'
import { useReveal } from '../lib/useReveal'

export function Hero({ c }: { c: Content }) {
  const ref = useReveal<HTMLElement>()
  const h = c.hero

  return (
    <section className="hero" id="top" ref={ref} aria-labelledby="hero-title">
      <Starburst className="hero__burst" />
      <div className="container">
        <div className="grid hero__grid">
          <div className="hero__copy">
            <h1 className="t-h1 hero__title" id="hero-title" data-reveal>
              {h.titleLead} <span className="hero__title-tail">{h.titleTail}</span>
            </h1>
            <p className="hero__sub muted" data-reveal style={stagger(1)}>
              {h.sub}
            </p>
            <div className="hero__actions" data-reveal style={stagger(2)}>
              <Button href="#pricing" icon={<ArrowRight />}>
                {h.cta1}
              </Button>
              <Button href="#how" variant="secondary">
                {h.cta2}
              </Button>
            </div>
            <p data-reveal style={stagger(3)}>
              <TextLink href={links.calendly} target="_blank" rel="noreferrer" icon={<ArrowRight size={14} />}>
                {h.cta3}
              </TextLink>
            </p>
          </div>

          <figure className="hero__panel" data-reveal style={stagger(3)} hidden>
            <figcaption className="hero__panel-head t-label">
              <span>Befund</span>
              <span className="faint">{h.panel.example}</span>
            </figcaption>
            <div className="hero__panel-block">
              <p className="hero__panel-label t-label faint">
                <span className="t-num">DE</span> {h.panel.scan}
              </p>
              <p className="hero__panel-scan t-small" lang="de">
                {h.panel.scanText}
              </p>
            </div>
            <div className="hero__panel-divider" aria-hidden>
              <span />
              <ArrowRight size={14} className="hero__panel-arrow" />
              <span />
            </div>
            <div className="hero__panel-block">
              <p className="hero__panel-label t-label faint">
                <span className="t-num">{c.lang.toUpperCase()}</span> {h.panel.read}
              </p>
              <p className="hero__panel-read">{h.panel.readText}</p>
            </div>
          </figure>
        </div>

        <dl className="stats">
          {c.stats.map((s, i) => (
            <div className="stats__item" key={i} data-reveal style={stagger(4 + i)}>
              <dt className="t-small muted">{s.label}</dt>
              <dd className="stats__value t-num">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
