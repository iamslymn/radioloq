import { useEffect, useState, type FormEvent } from 'react'
import { Button } from '../components/Button'
import { Checkbox, TextField } from '../components/Field'
import { CourseCases, CourseFoundations, CourseReport, CourseScan, Check, ArrowRight } from '../components/Icon'
import { CookieBar } from '../components/CookieBar'
import { LangSwitch } from '../components/LangSwitch'
import { Logo } from '../components/Logo'
import { SectionHeader } from '../components/Section'
import { Starburst } from '../components/StarburstMark'
import { type Lang, content, initialLang, languages, links, saveLang } from '../content'
import { coursesContent } from '../content/courses'
import { track } from '../lib/analytics'
import { installPlainAnchors } from '../lib/anchors'
import { stagger } from '../lib/stagger'
import { useReveal } from '../lib/useReveal'
import '../sections/landing.css'
import './Courses.css'

const ICONS = [CourseFoundations, CourseScan, CourseCases, CourseReport]
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function WaitlistForm({ lang, id }: { lang: Lang; id: string }) {
  const f = coursesContent[lang].form
  const privacyHref = content[lang].footer.privacyHref
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (honeypot) return
    if (!EMAIL_RE.test(email.trim())) return setError(f.errEmail)
    if (!consent) return setError(f.errConsent)
    setError(null)
    setSending(true)

    const body = JSON.stringify({
      email: email.trim(),
      language: lang,
      list: 'courses-waitlist',
      _subject: 'Courses reminder signup | Radioloq',
      _replyto: email.trim(),
    })

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(links.formspree, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body,
        })
        if (res.ok) {
          track('courses_waitlist_signup', { event_category: 'funnel', event_label: lang })
          setDone(true)
          setSending(false)
          return
        }
      } catch {
        // retry below
      }
      if (attempt < 3) await new Promise((r) => setTimeout(r, 1200))
    }
    setError(f.errSend)
    setSending(false)
  }

  if (done) {
    return (
      <div className="waitlist waitlist--done" role="status">
        <span className="waitlist__tick">
          <Check size={18} />
        </span>
        <div>
          <p className="waitlist__done-title">{f.doneTitle}</p>
          <p className="t-small muted">{f.doneText}</p>
        </div>
      </div>
    )
  }

  return (
    <form className="waitlist" onSubmit={submit} noValidate id={id}>
      <div className="waitlist__row">
        <TextField
          label={f.email}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder={f.emailPh}
          value={email}
          invalid={!!error && !EMAIL_RE.test(email.trim())}
          onChange={(e) => {
            setEmail(e.target.value)
            setError(null)
          }}
        />
        <Button type="submit" icon={<ArrowRight />} disabled={sending} className="waitlist__submit">
          {sending ? f.sending : f.submit}
        </Button>
      </div>
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="waitlist__trap"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
      />
      <Checkbox
        checked={consent}
        invalid={!!error && !consent}
        onChange={(v) => {
          setConsent(v)
          setError(null)
        }}
      >
        {f.consentPre} <a href={privacyHref}>{f.privacy}</a>
        {f.consentPost}
      </Checkbox>
      <p className="waitlist__error t-small" role="alert" hidden={!error}>
        {error}
      </p>
    </form>
  )
}

export default function Courses() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const c = content[lang]
  const t = coursesContent[lang]
  const heroRef = useReveal<HTMLElement>()
  const topicsRef = useReveal<HTMLOListElement>()
  const bandRef = useReveal<HTMLDivElement>()

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
  }, [lang, t])

  useEffect(() => installPlainAnchors(), [])

  const changeLang = (next: Lang) => {
    setLang(next)
    saveLang(next)
  }

  const f = c.footer

  return (
    <>
      <a className="skip-link" href="#main">
        {c.nav.skip}
      </a>
      <header className="site-header" data-scrolled="false">
        <div className="container site-header__inner">
          <a href="#top" className="site-header__logo" aria-label="Radioloq">
            <Logo />
          </a>
          <div className="site-header__end courses__header-end">
            <LangSwitch
              languages={languages}
              current={lang}
              onChange={(code) => changeLang(code as Lang)}
              label={c.nav.lang}
              unavailableHint={c.nav.langSoon}
            />
            <Button href="https://radioloq.com/" size="sm" variant="secondary" className="site-header__cta">
              {t.back}
            </Button>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="hero courses__hero" id="top" ref={heroRef} aria-labelledby="courses-title">
          <Starburst className="hero__burst" />
          <div className="container">
            <div className="hero__copy">
              <p className="hero__badge t-label" data-reveal>
                {t.badge}
              </p>
              <h1 className="t-h1 hero__title" id="courses-title" data-reveal style={stagger(1)}>
                {t.titleLead} <span className="hero__title-tail">{t.titleTail}</span>
              </h1>
              <p className="hero__sub muted" data-reveal style={stagger(2)}>
                {t.sub}
              </p>
              <div className="courses__form" data-reveal style={stagger(3)}>
                <WaitlistForm lang={lang} id="waitlist-hero" />
                <p className="t-small faint">{t.note}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="topics-title">
          <div className="container">
            <SectionHeader label={t.topics.label} title={t.topics.title} lead={t.topics.sub} id="topics-title" />
            <ol className="steps" ref={topicsRef}>
              {t.topics.items.map((s, i) => {
                const Icon = ICONS[i]
                return (
                  <li className="steps__item" key={i} data-reveal style={stagger(i)}>
                    <article className="steps__card">
                      <div className="steps__body">
                        <div className="steps__top">
                          <span className="steps__icon">
                            <Icon size={24} />
                          </span>
                          <span className="steps__index t-label t-num">{String(i + 1).padStart(2, '0')}</span>
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

        <section className="section inverse courses__band" aria-labelledby="band-title">
          <div className="container">
            <div className="courses__band-grid" ref={bandRef}>
              <div data-reveal>
                <h2 className="t-h2" id="band-title">
                  {t.band.title}
                </h2>
                <p className="courses__band-sub muted">{t.band.sub}</p>
              </div>
              <div className="courses__form" data-reveal style={stagger(1)}>
                <WaitlistForm lang={lang} id="waitlist-band" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="inverse site-footer courses__footer">
        <div className="container">
          <div className="site-footer__top">
            <a href="#top" className="site-footer__logo" aria-label="Radioloq">
              <Logo />
            </a>
            <nav className="site-footer__links t-small" aria-label="Footer">
              <a href={f.termsHref}>{f.terms}</a>
              <a href={f.privacyHref}>{f.privacy}</a>
              <a href={links.email}>{links.emailLabel}</a>
            </nav>
          </div>
          <p className="site-footer__text t-small faint">{f.text}</p>
        </div>
      </footer>
      <CookieBar
        text={c.cookie.text}
        termsLabel={c.cookie.terms}
        termsHref={f.termsHref}
        and={c.cookie.and}
        privacyLabel={c.cookie.privacy}
        privacyHref={f.privacyHref}
        accept={c.cookie.accept}
        reject={c.cookie.reject}
      />
    </>
  )
}
