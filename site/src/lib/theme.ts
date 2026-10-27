/**
 * Light and dark theme. The choice lives on <html data-theme>, set before first paint by the
 * inline script in index.html. Everyone starts in light; a visitor who switches to dark keeps
 * that choice on later visits. The system setting is deliberately not followed.
 */
export type Theme = 'light' | 'dark'

const KEY = 'theme'
const META = { light: '#F3F8FE', dark: '#0E1929' } as const

const isTheme = (v: unknown): v is Theme => v === 'light' || v === 'dark'

export function storedTheme(): Theme | null {
  try {
    const v = localStorage.getItem(KEY)
    return isTheme(v) ? v : null
  } catch {
    return null
  }
}

export function currentTheme(): Theme {
  const v = document.documentElement.dataset.theme
  return isTheme(v) ? v : storedTheme() ?? 'light'
}

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META[theme])
}

export function saveTheme(theme: Theme) {
  try {
    localStorage.setItem(KEY, theme)
  } catch {
    /* storage unavailable: the choice lasts for this page only */
  }
}
