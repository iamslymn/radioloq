import type { CSSProperties } from 'react'

/** Inline style that sets the reveal stagger index used by [data-reveal]. */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties
