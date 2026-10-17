/*
 * Single source of truth for the booking amounts shown on the site.
 *
 * GOÄ calculation, Punktwert 0,0582873 EUR:
 *   Basic     Nr. 85 x 1,47564                               + 2 x Nr. 95  =  50,00 EUR
 *   Standard  Nr. 85 x 2,27427 + Nr. 1 x 2,3                 + 2 x Nr. 95  =  84,00 EUR
 *   Premium   Nr. 85 x 2,28671 (two Ansätze) + Nr. 1 x 2,3   + 4 x Nr. 95  = 158,00 EUR
 *
 * All three factors stay below 2,3, so no written justification is required.
 * Premium presupposes more than 60 minutes of assessment work, which is why it
 * is only offered when a prior study of the same body region exists.
 */

export type PackageKey = 'basic' | 'standard' | 'premium'

export const PRICE: Record<PackageKey, number> = {
  basic: 50,
  standard: 84,
  premium: 158,
}

/** Tier names as the Formspree inbox and analytics expect them, in every language. */
export const TIER_NAME: Record<PackageKey, string> = {
  basic: 'Basic',
  standard: 'Standard',
  premium: 'Premium',
}

/*
 * One Stripe payment link per amount. Each link must redirect after payment to
 * https://radioloq.com/?paid=1&pkg=basic (standard, premium), which reopens the
 * checkout at the upload step. There is no server-side verification: check the
 * payment in the Stripe dashboard before starting work on a case.
 * If a link is ever replaced by a `REPLACE_WITH…` placeholder, the booking button shows `modal.linkErr`.
 */
export const STRIPE: Record<PackageKey, string> = {
  basic: 'https://buy.stripe.com/6oU6ozeLKh255jn0Vm8ww08',
  standard: 'https://buy.stripe.com/dRmeV59rqcLPcLPfQg8ww09',
  premium: 'https://buy.stripe.com/3cI8wH6fe3bffY1gUk8ww0a',
}

export const isPaymentLinkMissing = (url: string) => !url || url.startsWith('REPLACE_WITH')

export const formatPrice = (amount: number) => `${amount} €`

export const packageLabel = (key: PackageKey) => `${TIER_NAME[key]} · ${formatPrice(PRICE[key])}`

/** Maps the `?pkg=<code>` return parameter from Stripe onto a package. */
export const packageFromCode = (code: string | null): PackageKey | null =>
  code && Object.hasOwn(PRICE, code) ? (code as PackageKey) : null
