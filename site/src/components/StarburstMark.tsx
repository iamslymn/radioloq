import { Mark } from './Logo'
import './StarburstMark.css'

/** The logo's radial mark as a large fine-line graphic. Decorative only. */
export function Starburst({ className }: { className?: string }) {
  return (
    <div className={['starburst', className].filter(Boolean).join(' ')} aria-hidden>
      <Mark />
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
