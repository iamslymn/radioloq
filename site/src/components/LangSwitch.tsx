import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from './Icon'
import './LangSwitch.css'

export type Language = { code: string; label: string; available: boolean }

type Props = {
  languages: Language[]
  current: string
  onChange?: (code: string) => void
  label: string
  unavailableHint?: string
}

export function LangSwitch({ languages, current, onChange, label, unavailableHint }: Props) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        trigger.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="lang" ref={root} data-open={open}>
      <button
        ref={trigger}
        className="lang__trigger t-label"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="t-num">{current.toUpperCase()}</span>
        <ChevronDown size={14} className="lang__chevron" />
      </button>
      <ul className="lang__menu" role="menu">
        {languages.map((l) => {
          const active = l.code === current
          return (
            <li key={l.code} role="none">
              <button
                role="menuitemradio"
                aria-checked={active}
                className="lang__item"
                disabled={!l.available}
                title={l.available ? undefined : unavailableHint}
                tabIndex={open ? 0 : -1}
                onClick={() => {
                  onChange?.(l.code)
                  setOpen(false)
                }}
              >
                <span className="lang__code t-label t-num">{l.code.toUpperCase()}</span>
                <span className="lang__name">{l.label}</span>
                {active && <Check size={14} />}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
