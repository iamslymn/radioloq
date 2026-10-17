import { Logo } from '../components/Logo'
import { type Content, links } from '../content'
import { OPEN_COOKIE_SETTINGS } from '../lib/analytics'

export function Footer({ c }: { c: Content }) {
  const f = c.footer
  return (
    <footer className="inverse site-footer">
      <div className="container">
        <div className="site-footer__top">
          <a href="#top" className="site-footer__logo" aria-label="Radioloq">
            <Logo />
          </a>
          <nav className="site-footer__links t-small" aria-label="Footer">
            <a href={f.servicesHref}>{f.services}</a>
            <a href={f.termsHref}>{f.terms}</a>
            <a href={f.privacyHref}>{f.privacy}</a>
            <a href={links.email}>{links.emailLabel}</a>
            <button onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}>{f.cookies}</button>
          </nav>
        </div>
        <p className="site-footer__text t-small faint">{f.text}</p>
      </div>
    </footer>
  )
}
