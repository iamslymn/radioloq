import type { SVGProps } from 'react'

type Props = SVGProps<SVGSVGElement> & { size?: number }

function Base({ size = 16, children, ...props }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  )
}

export const ArrowRight = (p: Props) => (
  <Base {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </Base>
)

export const ArrowLeft = (p: Props) => (
  <Base {...p}>
    <path d="M13 8H3M7 4L3 8l4 4" />
  </Base>
)

export const ArrowUpRight = (p: Props) => (
  <Base {...p}>
    <path d="M5 11l6-6M6 5h5v5" />
  </Base>
)

export const Plus = (p: Props) => (
  <Base {...p}>
    <path d="M8 3v10M3 8h10" />
  </Base>
)

export const Check = (p: Props) => (
  <Base {...p}>
    <path d="M3.5 8.5l3 3 6-7" />
  </Base>
)

export const Close = (p: Props) => (
  <Base {...p}>
    <path d="M4 4l8 8M12 4l-8 8" />
  </Base>
)

export const Lock = (p: Props) => (
  <Base {...p}>
    <rect x="3.5" y="7" width="9" height="6.5" rx="1.5" />
    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" />
  </Base>
)

export const ChevronDown = (p: Props) => (
  <Base {...p}>
    <path d="M4 6l4 4 4-4" />
  </Base>
)

export const Notice = (p: Props) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.5M8 11h.01" />
  </Base>
)
