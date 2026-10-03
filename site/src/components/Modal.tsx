import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Close } from './Icon'
import './Modal.css'

type Props = {
  open: boolean
  onClose: () => void
  labelledBy: string
  closeLabel: string
  children: ReactNode
}

const EXIT_MS = 180

export function Modal({ open, onClose, labelledBy, closeLabel, children }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const [mounted, setMounted] = useState(open)

  if (open && !mounted) setMounted(true)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) dialog.showModal()
      document.documentElement.style.overflow = 'hidden'
      const raf = requestAnimationFrame(() => (dialog.dataset.state = 'open'))
      return () => cancelAnimationFrame(raf)
    }

    if (dialog.open) {
      dialog.dataset.state = 'closed'
      document.documentElement.style.overflow = ''
      const t = window.setTimeout(() => {
        dialog.close()
        setMounted(false)
      }, EXIT_MS)
      return () => window.clearTimeout(t)
    }
  }, [open, mounted])

  useEffect(() => () => void (document.documentElement.style.overflow = ''), [])

  if (!mounted) return null

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby={labelledBy}
      onCancel={(e) => {
        e.preventDefault()
        onClose()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="modal__panel">
        <button className="modal__close" onClick={onClose} aria-label={closeLabel}>
          <Close size={16} />
        </button>
        {children}
      </div>
    </dialog>
  )
}
