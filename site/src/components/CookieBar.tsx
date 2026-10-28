import { useEffect, useState } from 'react'
import { Button } from './Button'
import { CONSENT_KEY, OPEN_COOKIE_SETTINGS, disableAnalytics, loadAnalytics } from '../lib/analytics'
import './CookieBar.css'

type Props = {
  label: string
  text: string
  termsLabel: string
  termsHref: string
  and: string
  privacyLabel: string
  privacyHref: string
  accept: string
  reject: string
}

/** Storage can throw when cookies are blocked. The bar then simply asks again on the next visit. */
function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY)
  } catch {
    return null
  }
}

function saveConsent(value: string) {
  try {
    localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Choice holds for this page load only.
  }
}

export function CookieBar(p: Props) {
  const [visible, setVisible] = useState(() => !readConsent())

  useEffect(() => {
    if (readConsent() === 'accepted') loadAnalytics()
    const reopen = () => setVisible(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen)
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen)
  }, [])

  const decide = (value: 'accepted' | 'rejected') => {
    saveConsent(value)
    if (value === 'accepted') loadAnalytics()
    else disableAnalytics()
    setVisible(false)
  }

  return (
    <div className="cookie" data-visible={visible} role="region" aria-label={p.label} inert={!visible}>
      <p className="t-small muted">
        {p.text}{' '}
        <a className="cookie__link" href={p.termsHref}>
          {p.termsLabel}
        </a>{' '}
        {p.and}{' '}
        <a className="cookie__link" href={p.privacyHref}>
          {p.privacyLabel}
        </a>
        .
      </p>
      <div className="cookie__actions">
        <Button size="sm" variant="secondary" onClick={() => decide('rejected')}>
          {p.reject}
        </Button>
        <Button size="sm" onClick={() => decide('accepted')}>
          {p.accept}
        </Button>
      </div>
    </div>
  )
}
