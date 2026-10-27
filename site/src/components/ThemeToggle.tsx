import { useState } from 'react'
import { type Theme, applyTheme, currentTheme, saveTheme } from '../lib/theme'
import { Moon, Sun } from './Icon'
import './ThemeToggle.css'

type ViewTransitionDocument = Document & { startViewTransition?: (cb: () => void) => unknown }

/** Sun and moon button beside the language picker. Pressed means the dark theme is on. */
export function ThemeToggle({ label }: { label: string }) {
  const [theme, setTheme] = useState<Theme>(currentTheme)

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
