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

export const Sun = (p: Props) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="2.75" />
    <path d="M8 1.5v1.25M8 13.25v1.25M1.5 8h1.25M13.25 8h1.25M3.4 3.4l.9.9M11.7 11.7l.9.9M3.4 12.6l.9-.9M11.7 4.3l.9-.9" />
  </Base>
)

export const Moon = (p: Props) => (
  <Base {...p}>
    <path d="M13.25 9.6A5.5 5.5 0 0 1 6.4 2.75a5.5 5.5 0 1 0 6.85 6.85z" />
  </Base>
)

export const Mail = (p: Props) => (
  <Base {...p}>
    <rect x="2" y="3.5" width="12" height="9" rx="1.5" />
    <path d="M2.5 4.5L8 8.5l5.5-4" />
  </Base>
)

export const Video = (p: Props) => (
  <Base {...p}>
    <rect x="1.75" y="4" width="8.5" height="8" rx="1.5" />
    <path d="M10.25 7l4-2.25v6.5l-4-2.25" />
  </Base>
)

export const LinkedIn = (p: Props) => (
  <Base {...p}>
    <rect x="2" y="2" width="12" height="12" rx="2" />
    <path d="M5.25 7v4M5.25 5h.01M8 11V7M8 8.75c0-1 .75-1.75 1.75-1.75S11 7.75 11 8.75V11" />
  </Base>
)

export const Instagram = (p: Props) => (
  <Base {...p}>
    <rect x="2" y="2" width="12" height="12" rx="3.5" />
    <circle cx="8" cy="8" r="2.75" />
    <path d="M11.5 4.5h.01" />
  </Base>
)

export const Notice = (p: Props) => (
  <Base {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.5M8 11h.01" />
  </Base>
)

/* Process icons: 16px grid, parts carry classes so the cards can animate them on hover. */

export const StepUpload = (p: Props) => (
  <Base {...p}>
    <path className="ico-lift" d="M8 10V2.5M5 5l3-3 3 3" />
    <path d="M2.5 10v2.5a1 1 0 001 1h9a1 1 0 001-1V10" />
  </Base>
)

export const StepReview = (p: Props) => (
  <Base {...p}>
    <g className="ico-scan">
      <circle cx="7" cy="7" r="4.25" />
      <path d="M10.2 10.2L13.5 13.5" />
    </g>
  </Base>
)

export const StepTalk = (p: Props) => (
  <Base {...p}>
    <path d="M2.5 3.5a1 1 0 011-1h9a1 1 0 011 1v6a1 1 0 01-1 1H7l-3 2.5v-2.5h-.5a1 1 0 01-1-1v-6z" />
    <path className="ico-dots" d="M5.5 6.5h.01M8 6.5h.01M10.5 6.5h.01" />
  </Base>
)

export const StepConfident = (p: Props) => (
  <Base {...p}>
    <path d="M8 1.75l5 1.75v4c0 3-2.1 5.25-5 6.5-2.9-1.25-5-3.5-5-6.5v-4l5-1.75z" />
    <path className="ico-check" pathLength={1} d="M5.75 8l1.75 1.75L10.5 6.5" />
  </Base>
)

/* Course topic icons: reuse the ico-* hooks so the cards animate them on hover. */

export const CourseFoundations = (p: Props) => (
  <Base {...p}>
    <path className="ico-lift" d="M8 2L2.5 5 8 8l5.5-3L8 2z" />
    <path d="M2.5 8L8 11l5.5-3M2.5 11L8 14l5.5-3" />
  </Base>
)

export const CourseScan = (p: Props) => (
  <Base {...p}>
    <path d="M2.5 5.5v-2a1 1 0 011-1h2M10.5 2.5h2a1 1 0 011 1v2M13.5 10.5v2a1 1 0 01-1 1h-2M5.5 13.5h-2a1 1 0 01-1-1v-2" />
    <circle className="ico-scan" cx="8" cy="8" r="2.25" />
  </Base>
)

export const CourseCases = (p: Props) => (
  <Base {...p}>
    <path d="M3.5 2.5h6l3 3v8a1 1 0 01-1 1h-8a1 1 0 01-1-1v-10a1 1 0 011-1z" />
    <path className="ico-dots" d="M5.5 8.5h5M5.5 11h3" />
  </Base>
)

export const CourseReport = (p: Props) => (
  <Base {...p}>
    <rect x="3" y="2" width="10" height="12" rx="1.5" />
    <path className="ico-check" pathLength={1} d="M5.5 8.25l1.75 1.75 3.25-3.5" />
  </Base>
)
