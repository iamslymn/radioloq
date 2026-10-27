import { useState } from 'react'
import { Accordion } from '../components/Accordion'
import { Mark } from '../components/Logo'
import { Button, TextLink } from '../components/Button'
import { StepConfident, StepReview, StepTalk, StepUpload, ArrowRight, ArrowUpRight, Instagram, LinkedIn, Mail, Video } from '../components/Icon'
import { PriceTable } from '../components/PriceTable'
import { SectionHeader, SectionLabel } from '../components/Section'
import { type Content, type PackageKey, PRICE, links } from '../content'
import { stagger } from '../lib/stagger'
import { useReveal } from '../lib/useReveal'

type P = { c: Content }

const STEP_ICONS = [StepUpload, StepReview, StepTalk, StepConfident]

export function Process({ c }: P) {
  const ref = useReveal<HTMLOListElement>()
  return (
    <section className="section" id="how" aria-labelledby="how-title">
      <div className="container">
        <SectionHeader label={c.process.label} title={c.process.title} lead={c.process.sub} id="how-title" />
        <ol className="steps" ref={ref}>
          {c.process.steps.map((s, i) => {
            const Icon = STEP_ICONS[i % STEP_ICONS.length]
            return (
              <li className="steps__item" key={i} data-reveal style={stagger(i)}>
                <article className="steps__card">
                  <div className="steps__body">
                    <div className="steps__top">
                      <span className="steps__icon">
                        <Icon size={24} />
                      </span>
                      <span className="steps__index t-label t-num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="steps__title">{s.title}</h3>
                  </div>
                  <p className="steps__desc t-small muted">{s.desc}</p>
                </article>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

export function FirstAssessment({ c }: P) {
  const ref = useReveal<HTMLDivElement>()
  const f = c.firstAssessment
  return (
    <section className="section first" id="first-assessment" aria-labelledby="fa-title">
      <div className="container">
        <div className="inverse first__panel grid first__grid" ref={ref}>
          <div className="first__copy">
            <div data-reveal>
              <SectionLabel>{f.label}</SectionLabel>
            </div>
            <h2 className="t-h2" id="fa-title" data-reveal style={stagger(1)}>
              {f.title}
            </h2>
            <p className="muted" data-reveal style={stagger(2)}>
              {f.sub}
            </p>
          </div>
          <div className="first__action" data-reveal style={stagger(3)}>
            <Button href={links.calendly} target="_blank" rel="noreferrer" icon={<ArrowRight />}>
              {f.cta}
            </Button>
            <p className="t-small faint">{f.note}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Pricing({ c, onSelect }: P & { onSelect: (key: PackageKey) => void }) {
  const ref = useReveal<HTMLDivElement>()
  const tiers = c.pricing.tiers.map((t) => ({ ...t, price: PRICE[t.key] }))
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeader label={c.pricing.label} title={c.pricing.title} lead={c.pricing.sub} id="pricing-title" />
        <div className="pricing__table" ref={ref} data-reveal>
          <PriceTable tiers={tiers} onSelect={(k) => onSelect(k as PackageKey)} />
          <p className="t-small faint pricing__vat">{c.pricing.vat}</p>
          <div className="pricing__billing">
            <p className="t-small muted">{c.pricing.note}</p>
            <TextLink href={`/services-${c.lang}`} icon={<ArrowRight size={14} />}>
              {c.pricing.link}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export function About({ c }: P) {
  const ref = useReveal<HTMLDivElement>()
  const a = c.about
  const [photoOk, setPhotoOk] = useState(true)
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader label={a.label} title={a.name} lead={a.role} id="about-title" />
        <div className="grid about__body" ref={ref}>
          <figure className="about__portrait" data-reveal>
            {photoOk ? (
              <img
                className="about__photo"
                src={a.photo}
                alt={a.name}
                width={880}
                height={1100}
                loading="lazy"
                decoding="async"
                onError={() => setPhotoOk(false)}
              />
            ) : (
              <div className="about__portrait-empty" aria-hidden>
                <Mark />
              </div>
            )}
          </figure>
          <p className="t-sub about__bio" data-reveal>
            {a.bio}
          </p>
          <p className="t-small faint about__notice" data-reveal style={stagger(1)}>
            {a.notice}
          </p>
          <blockquote className="about__quote" data-reveal style={stagger(2)}>
            <p className="t-h2">
              <span className="about__mark" aria-hidden>
                “
              </span>
              {a.quote}
            </p>
            <footer className="t-small muted">{a.cite}</footer>
          </blockquote>
        </div>
      </div>
    </section>
  )
}

export function Faq({ c }: P) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <div className="split">
          <div className="split__head">
            <SectionHeader label={c.faq.label} title={c.faq.title} id="faq-title" />
          </div>
          <div className="faq__list" ref={ref} data-reveal>
            <Accordion items={c.faq.items} />
          </div>
        </div>
      </div>
    </section>
  )
}

const contactIcons: Record<string, typeof Mail> = {
  mail: Mail,
  video: Video,
  linkedin: LinkedIn,
  instagram: Instagram,
}

export function Contact({ c }: P) {
  const ref = useReveal<HTMLUListElement>()
  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="split">
          <div className="split__head">
            <SectionHeader label={c.contact.label} title={c.contact.title} id="contact-title" />
          </div>
          <ul className="contact" ref={ref}>
            {c.contact.rows.map((r, i) => {
              const RowIcon = contactIcons[r.icon]
              return (
              <li key={r.icon} data-reveal style={stagger(i)}>
                <a
                  className="contact__row"
                  href={r.href}
                  {...(r.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <span className="contact__icon">{RowIcon && <RowIcon size={18} />}</span>
                  <span className="contact__type t-label faint">{r.type}</span>
                  <span className="contact__label">{r.label}</span>
                  <span className="contact__cta t-small">
                    {r.cta}
                    {r.external ? <ArrowUpRight size={14} /> : <ArrowRight size={14} />}
                  </span>
                </a>
              </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Doctors({ c }: P) {
  const ref = useReveal<HTMLDivElement>()
  const d = c.doctors
  return (
    <section className="doctors" aria-labelledby="doctors-title">
      <div className="container">
        <div className="doctors__panel grid doctors__grid" ref={ref} data-reveal>
          <h2 className="t-h3 doctors__title" id="doctors-title">
            {d.title}
          </h2>
          <div className="doctors__body">
            <p className="muted">{d.sub}</p>
            <TextLink href={links.courses} target="_blank" rel="noreferrer" icon={<ArrowUpRight size={14} />}>
              {d.cta}
            </TextLink>
          </div>
        </div>
      </div>
    </section>
  )
}
