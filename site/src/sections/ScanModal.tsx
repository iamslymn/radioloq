import { useEffect, useRef, useState } from 'react'
import { Button } from '../components/Button'
import { Checkbox, Select, TextArea, TextField } from '../components/Field'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock, Notice } from '../components/Icon'
import { Modal } from '../components/Modal'
import { MarkSpinner } from '../components/StarburstMark'
import type { Content, PackageKey } from '../content/az'
import { links, packages } from '../content/az'
import { track } from '../lib/analytics'
import './ScanModal.css'

export type Step = 'payment' | 'pending' | 'upload'

type Props = {
  c: Content
  open: boolean
  pkg: PackageKey
  initialStep: Step | null
  onClose: () => void
}

export function ScanModal({ c, open, pkg, initialStep, onClose }: Props) {
  const m = c.modal
  const pack = packages[pkg]
  const tier = c.pricing.tiers.find((t) => t.key === pkg)!

  const [step, setStep] = useState<Step>(initialStep || 'payment')
  const [consent, setConsent] = useState([false, false, false])
  const [consentErr, setConsentErr] = useState(false)
  const [opened, setOpened] = useState<'stripe' | 'paypal' | null>(null)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameErr, setNameErr] = useState(false)
  const [emailErr, setEmailErr] = useState(false)
  const [language, setLanguage] = useState('')
  const [note, setNote] = useState('')
  const [honeypot, setHoneypot] = useState('')
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)

  const poll = useRef<number | null>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (open) track('modal_open', { event_category: 'funnel', event_label: pack.label })
  }, [open, pack.label])

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    heading.current?.focus()
  }, [step, done])

  useEffect(() => () => void (poll.current && window.clearInterval(poll.current)), [])

  const startPolling = () => {
    if (poll.current) window.clearInterval(poll.current)
    poll.current = window.setInterval(async () => {
      const session = new URLSearchParams(window.location.search).get('session')
      if (!session) return
      try {
        const res = await fetch(`${links.api}/verify?session=${session}`)
        if ((await res.json()).valid) {
          if (poll.current) window.clearInterval(poll.current)
          setStep('upload')
          window.history.replaceState({}, '', window.location.pathname)
        }
      } catch {
        /* keep polling */
      }
    }, 2000)
  }

  const pay = (method: 'stripe' | 'paypal') => {
    if (consent.some((v) => !v)) {
      setConsentErr(true)
      return
    }
    track('payment_click', { event_category: 'funnel', event_label: pack.label, payment_method: method })
    window.open(pack[method], '_blank')
    setOpened(method)
    setStep('pending')
    startPolling()
  }

  const submit = async () => {
    if (honeypot) return
    const missingName = !name.trim()
    const missingEmail = !email.trim()
    setNameErr(missingName)
    setEmailErr(missingEmail)
    if (missingName || missingEmail) return

    setSending(true)
    const body = JSON.stringify({
      name,
      email,
      package: pack.label,
      language: language || 'Not selected',
      clinical_context: note || 'Not provided',
      _subject: `New scan request — Radioloq | ${pack.label}`,
      _replyto: email,
    })

    let lastError: unknown = null
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const res = await fetch(links.formspree, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body,
        })
        if (res.ok) {
          track('upload_complete', { event_category: 'funnel', event_label: pack.label })
          setDone(true)
          setSending(false)
          return
        }
        lastError = new Error(`HTTP ${res.status}`)
      } catch (e) {
        lastError = e
      }
      if (attempt < 3) await new Promise((r) => setTimeout(r, 1200))
    }
    console.error('Formspree submission failed after retries:', lastError)
    alert(m.submitError)
    setSending(false)
  }

  const fieldError = nameErr && emailErr ? m.fieldsRequiredBoth : nameErr ? m.fieldsRequiredName : emailErr ? m.fieldsRequiredEmail : null

  const packageLine = (
    <p className="scan__pkg t-small">
      <span>
        {tier.tier} · {tier.name}
      </span>
      <span className="t-num">€{pack.price}</span>
    </p>
  )

  return (
    <Modal open={open} onClose={onClose} labelledBy="scan-title" closeLabel={m.close}>
      <div className="scan" data-step={step}>
        <ol className="scan__progress t-label" aria-hidden>
          {(['payment', 'pending', 'upload'] as Step[]).map((s, i) => (
            <li key={s} data-state={s === step ? 'current' : ['payment', 'pending', 'upload'].indexOf(step) > i ? 'done' : 'todo'}>
              <span />
            </li>
          ))}
        </ol>

        {step === 'payment' && (
          <div className="scan__step" key="payment">
            <header className="scan__head">
              <h2 className="t-h4" id="scan-title" ref={heading} tabIndex={-1}>
                {m.title}
              </h2>
              {packageLine}
              <p className="t-small muted">{m.sub}</p>
            </header>

            <aside className="scan__notice">
              <Notice size={16} />
              <div>
                <p className="t-label">{m.discTitle}</p>
                <p className="t-small muted">{m.discText}</p>
              </div>
            </aside>

            <div className="scan__consents">
              {[
                <>
                  {m.chk1.pre}
                  <a href={m.chk1.href} target="_blank" rel="noreferrer">
                    {m.chk1.link}
                  </a>
                  {m.chk1.post}
                </>,
                <>
                  {m.chk2.pre}
                  <a href={m.chk2.href} target="_blank" rel="noreferrer">
                    {m.chk2.link}
                  </a>
                  {m.chk2.post}
                </>,
                <>{m.chk3}</>,
              ].map((label, i) => (
                <Checkbox
                  key={i}
                  checked={consent[i]}
                  invalid={consentErr}
                  onChange={(v) => {
                    setConsent((prev) => prev.map((p, j) => (j === i ? v : p)))
                    setConsentErr(false)
                  }}
                >
                  {label}
                </Checkbox>
              ))}
            </div>

            {consentErr && (
              <p className="scan__error t-small" role="alert">
                {m.payErr}
              </p>
            )}

            <div className="scan__pay">
              <p className="t-label faint">{m.payLabel}</p>
              <div className="scan__pay-row">
                <Button block onClick={() => pay('stripe')} disabled={opened === 'stripe'}>
                  {opened === 'stripe' ? m.opening : m.stripe}
                </Button>
                <span className="t-small faint">{m.or}</span>
                <Button block variant="secondary" onClick={() => pay('paypal')} disabled={opened === 'paypal'}>
                  {opened === 'paypal' ? m.opening : m.paypal}
                </Button>
              </div>
              <p className="scan__secure t-small faint">
                <Lock size={14} />
                {m.secure}
              </p>
            </div>
          </div>
        )}

        {step === 'pending' && (
          <div className="scan__step scan__step--center" key="pending">
            <MarkSpinner size={40} label={m.pendingTitle} />
            <h2 className="t-h4" id="scan-title" ref={heading} tabIndex={-1}>
              {m.pendingTitle}
            </h2>
            {packageLine}
            <p className="t-small muted">{m.pendingText}</p>
            <div className="scan__stack">
              <Button block icon={<ArrowRight />} onClick={() => setStep('upload')}>
                {m.confirmBtn}
              </Button>
              <Button block variant="secondary" onClick={() => setStep('payment')}>
                <ArrowLeft size={14} /> {m.backBtn}
              </Button>
            </div>
          </div>
        )}

        {step === 'upload' && !done && (
          <div className="scan__step" key="upload">
            <header className="scan__head">
              <h2 className="t-h4" id="scan-title" ref={heading} tabIndex={-1}>
                {m.uploadTitle}
              </h2>
              {packageLine}
              <p className="scan__confirmed t-small">
                <Check size={14} />
                {m.uploadSub}
              </p>
            </header>

            <ol className="scan__howto t-small">
              {m.steps.map((s, i) => (
                <li key={i}>
                  <span className="t-label t-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>

            <form
              className="scan__form"
              noValidate
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
            >
              <div className="scan__row">
                <TextField
                  label={m.nameLabel}
                  autoComplete="name"
                  value={name}
                  invalid={nameErr}
                  onChange={(e) => {
                    setName(e.target.value)
                    setNameErr(false)
                  }}
                />
                <TextField
                  label={m.emailLabel}
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  invalid={emailErr}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailErr(false)
                  }}
                />
              </div>
              {fieldError && (
                <p className="scan__error t-small" role="alert">
                  {fieldError}
                </p>
              )}
              <div className="scan__row">
                <Select label={m.langLabel} value={language} onChange={(e) => setLanguage(e.target.value)}>
                  <option value="">{m.langPlaceholder}</option>
                  {m.langOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </Select>
                <Select label={m.packageLabel} value={pack.label} disabled>
                  <option>{pack.label}</option>
                </Select>
              </div>
              <TextArea label={m.noteLabel} placeholder={m.notePh} value={note} onChange={(e) => setNote(e.target.value)} />
              <input
                type="text"
                className="visually-hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
              <p className="t-small faint">{m.fnote}</p>
              <Button block type="submit" disabled={sending} icon={sending ? undefined : <ArrowRight />}>
                {sending ? m.sending : m.submitBtn}
              </Button>
            </form>
          </div>
        )}

        {step === 'upload' && done && (
          <div className="scan__step scan__step--center" key="done">
            <span className="scan__done-icon">
              <Check size={20} strokeWidth={2} />
            </span>
            <h2 className="t-h4" id="scan-title" ref={heading} tabIndex={-1}>
              {m.doneTitle}
            </h2>
            <p className="t-small muted">{m.doneText}</p>
            <div className="scan__stack">
              <Button href={links.upload} target="_blank" rel="noreferrer" block icon={<ArrowUpRight />}>
                {m.uploadBtn}
              </Button>
            </div>
            <p className="scan__secure t-small faint">
              <Lock size={14} />
              {m.uploadSecureNote}
            </p>
          </div>
        )}
      </div>
    </Modal>
  )
}
