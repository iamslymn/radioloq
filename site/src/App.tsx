import { useEffect, useState } from 'react'
import { CookieBar } from './components/CookieBar'
import { type Lang, type PackageKey, content, initialLang, packageFromCode, packageLabel, saveLang } from './content'
import { track } from './lib/analytics'
import { installPlainAnchors } from './lib/anchors'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { ScanModal, type Step } from './sections/ScanModal'
import { About, Contact, Doctors, Faq, FirstAssessment, Pricing, Process } from './sections/Sections'
import './sections/landing.css'

type ModalState = { open: boolean; pkg: PackageKey; step: Step | null; session: number }

/** Stripe redirects back with ?paid=1&pkg=basic|standard|premium. */
function resumeFromPayment(): ModalState {
  const params = new URLSearchParams(window.location.search)
  const key = packageFromCode(params.get('pkg'))
  if (params.get('paid') === '1' && key) {
    return { open: true, pkg: key, step: 'upload', session: 1 }
  }
  return { open: false, pkg: 'basic', step: null, session: 0 }
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang)
  const c = content[lang]
  const [modal, setModal] = useState<ModalState>(resumeFromPayment)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = c.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', c.meta.description)
  }, [lang, c])

  useEffect(() => installPlainAnchors(), [])

  const changeLang = (next: Lang) => {
    setLang(next)
    saveLang(next)
    const url = new URL(window.location.href)
    if (url.searchParams.has('lang')) {
      url.searchParams.set('lang', next)
      window.history.replaceState({}, '', url)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('paid') !== '1') return
    const key = packageFromCode(params.get('pkg'))
    if (key) {
      track('payment_redirect_resume', { event_category: 'funnel', event_label: packageLabel(key) })
    }
    window.history.replaceState({}, '', window.location.pathname)
  }, [])

  const openModal = (pkg: PackageKey) => setModal((m) => ({ open: true, pkg, step: null, session: m.session + 1 }))

  return (
    <>
      <a className="skip-link" href="#main">
        {c.nav.skip}
      </a>
      <Header c={c} onLangChange={changeLang} />
      <main id="main">
        <Hero c={c} />
        <Process c={c} />
        <FirstAssessment c={c} />
        <Pricing c={c} onSelect={openModal} />
        <About c={c} />
        <Faq c={c} />
        <Contact c={c} />
        <Doctors c={c} />
      </main>
      <Footer c={c} />
      <CookieBar
        text={c.cookie.text}
        termsLabel={c.cookie.terms}
        termsHref={c.footer.termsHref}
        and={c.cookie.and}
        privacyLabel={c.cookie.privacy}
        privacyHref={c.footer.privacyHref}
        accept={c.cookie.accept}
        reject={c.cookie.reject}
      />
      <ScanModal
        key={modal.session}
        c={c}
        open={modal.open}
        pkg={modal.pkg}
        initialStep={modal.step}
        onClose={() => setModal((m) => ({ ...m, open: false }))}
      />
    </>
  )
}
