/* Language-independent data shared by every content file. */

export const links = {
  calendly: 'https://calendly.com/adalat-ganjali/15min',
  email: 'mailto:info@radioloq.com',
  emailLabel: 'info@radioloq.com',
  linkedin: 'https://linkedin.com/in/adalatganjali',
  instagram: 'https://instagram.com/adalat.radiologie',
  courses: 'https://courses.radioloq.com/',
  upload: 'https://sync.luckycloud.de/u/d/47c6a267df094a9a8e65/',
  formspree: 'https://formspree.io/f/xrejnvok',
} as const

export type Lang = 'az' | 'en' | 'tr' | 'de' | 'ru'

export const languages: { code: Lang; label: string; available: boolean }[] = [
  { code: 'az', label: 'Azərbaycanca', available: true },
  { code: 'en', label: 'English', available: true },
  { code: 'tr', label: 'Türkçe', available: true },
  { code: 'de', label: 'Deutsch', available: true },
  { code: 'ru', label: 'Русский', available: true },
]

export type LinkedText = { pre: string; link: string; href: string; post: string }
