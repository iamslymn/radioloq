import type { SVGProps } from 'react'
import { MARK_PATHS, WORDMARK_PATHS } from './logoPaths'

type Props = SVGProps<SVGSVGElement> & { title?: string }

function MarkShapes() {
  return (
    <>
      {MARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
      <ellipse cx="69.98" cy="68.92" rx="7.05" ry="6.98" />
    </>
  )
}

export function Mark({ title, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 140 138"
      fill="currentColor"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...props}
    >
      {title && <title>{title}</title>}
      <MarkShapes />
    </svg>
  )
}

export function Logo({ title = 'Radioloq', ...props }: Props) {
  return (
    <svg viewBox="0 0 610.62 137.85" fill="currentColor" role="img" {...props}>
      <title>{title}</title>
      <MarkShapes />
      {WORDMARK_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}
