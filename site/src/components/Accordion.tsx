import { useId, useState, type ReactNode } from 'react'
import { Plus } from './Icon'
import './Accordion.css'

export type AccordionItem = { q: ReactNode; a: ReactNode }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const baseId = useId()

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${baseId}-b${i}`
        const panelId = `${baseId}-p${i}`
        return (
          <div className="accordion__item" data-open={isOpen} key={i}>
            <h3 className="accordion__heading">
              <button
                id={btnId}
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="accordion__index t-label t-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="accordion__q">{item.q}</span>
                <span className="accordion__icon">
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="accordion__panel" inert={!isOpen}>
              <div className="accordion__inner">
                <p className="accordion__a muted">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
