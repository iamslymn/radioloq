import { useId } from 'react'
import { Mark } from './Logo'
import { MARK_PATHS } from './logoPaths'
import './StarburstMark.css'

/* Centre of the radial mark in the logo's own coordinates. */
const CX = 69.98
const CY = 68.92

/* Gradient stops read their colour from the theme (tokens.css, --halo-* and --ray-*). */
const stop = (name: string) => ({ stopColor: `var(--${name})`, stopOpacity: `var(--${name}-a)` })

/**
 * The logo's radial mark drawn as light, like a film on a lightbox: the same rays as the
 * logo, bright at the core and fading out towards the tips, over a soft halo. Decorative only.
 */
export function Starburst({ className }: { className?: string }) {
  const id = useId().replace(/[^a-zA-Z0-9-]/g, '')
  const halo = `${id}-halo`
  const ray = `${id}-ray`
  const core = `${id}-core`
  const bloom = `${id}-bloom`
  const rays = MARK_PATHS.map((d) => <path key={d} d={d} />)

  return (
    <div className={['starburst', className].filter(Boolean).join(' ')} aria-hidden>
      <svg viewBox="-30 -30 200 198">
        <defs>
          <radialGradient id={halo} cx={CX} cy={CY} r="96" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={stop('halo-1')} />
            <stop offset="0.14" style={stop('halo-2')} />
            <stop offset="0.42" style={stop('halo-3')} />
            <stop offset="1" style={{ stopColor: 'var(--halo-3)', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id={ray} cx={CX} cy={CY} r="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" style={stop('ray-1')} />
            <stop offset="0.32" style={stop('ray-2')} />
            <stop offset="0.72" style={stop('ray-3')} />
            <stop offset="1" style={{ stopColor: 'var(--ray-3)', stopOpacity: 0 }} />
          </radialGradient>
          <radialGradient id={core} cx={CX} cy={CY} r="8.5" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="0.45" stopColor="#ffffff" />
            <stop offset="1" stopColor="#a3c3fe" />
          </radialGradient>
          <filter id={bloom} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <circle className="starburst__halo" cx={CX} cy={CY} r="96" fill={`url(#${halo})`} />
        <g className="starburst__rays" fill={`url(#${ray})`}>
          <g filter={`url(#${bloom})`} opacity="0.6">{rays}</g>
          <g>{rays}</g>
        </g>
        <circle className="starburst__core" cx={CX} cy={CY} r="8.5" fill={`url(#${core})`} />
      </svg>
    </div>
  )
}

/** Small rotating mark used while waiting on something (e.g. payment confirmation). */
export function MarkSpinner({ size = 28, label }: { size?: number; label: string }) {
  return (
    <span className="mark-spinner" role="status" style={{ width: size, height: size }}>
      <Mark />
      <span className="visually-hidden">{label}</span>
    </span>
  )
}
