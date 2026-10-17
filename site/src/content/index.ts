import az, { type Content } from './az'
import de from './de'
import en from './en'
import ru from './ru'
import { type Lang, languages } from './shared'
import tr from './tr'

export * from './detect'
export * from './pricing'
export * from './shared'
export type { Content }

export const content: Record<Lang, Content> = { az, en, tr, de, ru }

export const languageLabel = (lang: Lang) => languages.find((l) => l.code === lang)?.label ?? lang
