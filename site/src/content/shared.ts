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
  api: 'https://radioloq-api.vercel.app',
} as const

export type PackageKey = 'basic' | 'standard' | 'premium'

/** Package identifiers as the payment links, API and Formspree inbox expect them. */
export const packages: Record<PackageKey, { label: string; price: number; stripe: string; paypal: string }> = {
  basic: {
    label: 'Basic — €52',
    price: 52,
    stripe: 'https://buy.stripe.com/00w5kv7ji6nrh258nO8ww04',
    paypal: 'https://www.paypal.com/ncp/payment/FBBSBEV9XZQZ4',
  },
  standard: {
    label: 'Standard — €72',
    price: 72,
    stripe: 'https://buy.stripe.com/fZu9AL6febHL1370Vm8ww05',
    paypal: 'https://www.paypal.com/ncp/payment/MKFVEECTYTEDE',
  },
  premium: {
    label: 'Premium — €83',
    price: 83,
    stripe: 'https://buy.stripe.com/bJe3cn7ji3bf6nrdI88ww06',
    paypal: 'https://www.paypal.com/ncp/payment/KDWLGX32B8B28',
  },
}

export type Lang = 'az' | 'en' | 'tr' | 'de' | 'ru'

export const languages: { code: Lang; label: string; available: boolean }[] = [
  { code: 'az', label: 'Azərbaycanca', available: true },
  { code: 'en', label: 'English', available: true },
  { code: 'tr', label: 'Türkçe', available: true },
  { code: 'de', label: 'Deutsch', available: true },
  { code: 'ru', label: 'Русский', available: true },
]

export type LinkedText = { pre: string; link: string; href: string; post: string }
