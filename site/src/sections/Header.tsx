import { useEffect, useState } from 'react'
import { Button } from '../components/Button'
import { LangSwitch } from '../components/LangSwitch'
import { Logo } from '../components/Logo'
import { type Content, type Lang, languages } from '../content'

export function Header({ c, onLangChange }: { c: Content; onLangChange: (lang: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header__inner">
        <a href="#top" className="site-header__logo" aria-label="Radioloq">
          <Logo />
        </a>
        <nav className="site-header__nav" aria-label="Primary">
          <a href="#how">{c.nav.how}</a>
          <a href="#pricing">{c.nav.price}</a>
          <a href="#about">{c.nav.about}</a>
        </nav>
        <div className="site-header__end">
          <LangSwitch
            languages={languages}
            current={c.lang}
            onChange={(code) => onLangChange(code as Lang)}
            label={c.nav.lang}
            unavailableHint={c.nav.langSoon}
          />
          <Button href="#pricing" size="sm" className="site-header__cta">
            {c.nav.cta}
          </Button>
        </div>
      </div>
    </header>
  )
}
