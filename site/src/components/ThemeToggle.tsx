import { useEffect, useState } from 'react'
import { type Theme, applyTheme, currentTheme, saveTheme, storedTheme } from '../lib/theme'
import { Moon, Sun } from './Icon'
import './ThemeToggle.css'

type ViewTransitionDocument = Document & { startViewTransition?: (cb: () => void) => unknown }

/** Sun and moon button beside the language picker. Pressed means the dark theme is on. */
export function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<Theme>(currentTheme)

  // Without a saved choice, follow the system setting live.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = (e: MediaQueryListEvent) => {
      if (storedTheme()) return
      const next: Theme = e.matches ? 'dark' : 'light'
      applyTheme(next)
      setTheme(next)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    const swap = () => {
      applyTheme(next)
      setTheme(next)
    }
    saveTheme(next)
    // A short cross-fade where the browser supports it; an instant switch everywhere else.
    const doc = document as ViewTransitionDocument
    const calm = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (doc.startViewTransition && !calm) doc.startViewTransition(swap)
    else swap()
  }

  const dark = theme === 'dark'
  return (
    <button type="button" className="theme-toggle" aria-pressed={dark} aria-label={label} title={label} onClick={toggle}>
      <span className="theme-toggle__icon" data-show={!dark}>
        <Moon size={18} />
      </span>
      <span className="theme-toggle__icon" data-show={dark}>
        <Sun size={18} />
      </span>
    </button>
  )
}
