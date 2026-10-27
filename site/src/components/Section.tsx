import type { ReactNode } from 'react'
import { useReveal } from '../lib/useReveal'
import { stagger } from '../lib/stagger'
import './Section.css'

export function Rule({ strong }: { strong?: boolean }) {
  return <hr className={strong ? 'rule rule--strong' : 'rule'} />
}

type LabelProps = { index?: string; children: ReactNode }

/** A report-style field label: "01  Proses". */
export function SectionLabel({ index, children }: LabelProps) {
  return (
    <p className="section-label t-label">
      {index && <span className="section-label__index t-num">{index}</span>}
      <span>{children}</span>
    </p>
  )
}

type HeaderProps = {
  index?: string
  label: ReactNode
  title: ReactNode
  lead?: ReactNode
  aside?: ReactNode
  id?: string
}

/** Label, heading and lead stacked as one block. Long sections put this block beside their content (see .split). */
export function SectionHeader({ index, label, title, lead, aside, id }: HeaderProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div className="section-header" ref={ref}>
      <div data-reveal>
        <SectionLabel index={index}>{label}</SectionLabel>
      </div>
      <h2 className="t-h2" id={id} data-reveal style={stagger(1)}>
        {title}
      </h2>
      {lead && (
        <p className="section-header__lead muted" data-reveal style={stagger(2)}>
          {lead}
        </p>
      )}
      {aside}
    </div>
  )
}
