const GA_ID = 'G-BVC0651H14'
export const CONSENT_KEY = 'cookie-consent'
export const OPEN_COOKIE_SETTINGS = 'radioloq-open-cookie-settings'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    gaLoaded?: boolean
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

export function loadAnalytics() {
  if (window.gaLoaded) return
  window.gaLoaded = true
  window[`ga-disable-${GA_ID}`] = false
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
  window.dataLayer = window.dataLayer || []
  window.gtag =
    window.gtag ||
    function gtag() {
      // gtag.js expects the raw `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments)
    }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)
}

export function disableAnalytics() {
  window[`ga-disable-${GA_ID}`] = true
}

export function track(event: string, params: Record<string, unknown>) {
  window.gtag?.('event', event, params)
}
