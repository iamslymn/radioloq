import az, { type Content } from './az'
import de from './de'
import en from './en'
import ru from './ru'
import { type Lang, languages } from './shared'
import tr from './tr'

export * from './pricing'
export * from './shared'
export type { Content }

export const content: Record<Lang, Content> = { az, en, tr, de, ru }

const STORAGE_KEY = 'lang'

const isLang = (v: string | null): v is Lang => !!v && v in content

/** `?lang=xx` wins, then the visitor's last choice, then Azerbaijani. */
export function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isLang(stored)) return stored
  } catch {
    /* storage unavailable */
  }
  return 'az'
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* storage unavailable */
  }
}

export const languageLabel = (lang: Lang) => languages.find((l) => l.code === lang)?.label ?? lang
