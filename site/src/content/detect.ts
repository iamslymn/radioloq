/**
 * Picks the language a visitor sees first. Kept free of the translation files so the entry
 * bundle can use it without loading all five languages up front.
 */
import { type Lang, languages } from './shared'

/** The visitor's own choice, saved when they use the language switcher. */
const STORAGE_KEY = 'lang'
/** The language guessed from the visitor's country, kept for the current browser session. */
const GEO_KEY = 'lang-geo'

/** ISO 3166-1 country code → site language. Countries not listed fall back to the browser language. */
const COUNTRY_LANG: Record<string, Lang> = {
  AZ: 'az',
  TR: 'tr',
  DE: 'de',
  AT: 'de',
  CH: 'de',
  LI: 'de',
  RU: 'ru',
  BY: 'ru',
  KZ: 'ru',
  KG: 'ru',
}

const isLang = (v: string | null | undefined): v is Lang => !!v && languages.some((l) => l.code === v)

type Store = 'localStorage' | 'sessionStorage'

function read(store: Store, key: string): string | null {
  try {
    return window[store].getItem(key)
  } catch {
    return null /* storage unavailable */
  }
}

function write(store: Store, key: string, value: string) {
  try {
    window[store].setItem(key, value)
  } catch {
    /* storage unavailable */
  }
}

const urlLang = () => new URLSearchParams(window.location.search).get('lang')

/** First language in the browser's preference list that the site offers. */
function browserLang(): Lang | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const code = tag?.toLowerCase().split('-')[0]
    if (isLang(code)) return code
  }
  return null
}

/**
 * Asks the edge for the visitor's country and remembers the matching language.
 * Does nothing when the visitor already chose a language, so a deliberate choice is never overridden.
 * Never rejects: if the lookup is slow or unavailable (e.g. local dev) the site just uses the browser language.
 */
export async function detectLang(timeoutMs = 1500): Promise<void> {
  if (isLang(urlLang()) || isLang(read('localStorage', STORAGE_KEY)) || read('sessionStorage', GEO_KEY)) return
  try {
    const res = await fetch('/api/country', { signal: AbortSignal.timeout(timeoutMs), cache: 'no-store' })
    if (!res.ok) return
    const { country } = (await res.json()) as { country: string | null }
    const lang = country ? COUNTRY_LANG[country] : undefined
    // '-' marks "looked it up, no language for this country" so we don't ask again this session.
    write('sessionStorage', GEO_KEY, lang ?? '-')
  } catch {
    /* offline, blocked or timed out: fall through to the browser language */
  }
}

/**
 * `?lang=xx` wins, then the visitor's own earlier choice, then the language of their country,
 * then their browser language, then English.
 */
export function initialLang(): Lang {
  const fromUrl = urlLang()
  if (isLang(fromUrl)) return fromUrl
  const stored = read('localStorage', STORAGE_KEY)
  if (isLang(stored)) return stored
  const geo = read('sessionStorage', GEO_KEY)
  if (isLang(geo)) return geo
  return browserLang() ?? 'en'
}

export function saveLang(lang: Lang) {
  write('localStorage', STORAGE_KEY, lang)
}
