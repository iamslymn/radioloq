import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { Check } from './Icon'
import './Field.css'

type Labelled = { label: string; invalid?: boolean }

export function TextField({ label, invalid, ...rest }: Labelled & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="field" data-invalid={invalid || undefined}>
      <span className="field__label t-label">{label}</span>
      <input className="field__control" aria-invalid={invalid || undefined} {...rest} />
    </label>
  )
}

export function TextArea({ label, invalid, ...rest }: Labelled & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="field" data-invalid={invalid || undefined}>
      <span className="field__label t-label">{label}</span>
      <textarea className="field__control field__control--area" aria-invalid={invalid || undefined} {...rest} />
    </label>
  )
}

export function Select({
  label,
  children,
  ...rest
}: Labelled & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <label className="field">
      <span className="field__label t-label">{label}</span>
      <select className="field__control field__control--select" {...rest}>
        {children}
      </select>
    </label>
  )
}

type CheckboxProps = {
  checked: boolean
  onChange: (checked: boolean) => void
  invalid?: boolean
  children: ReactNode
}

export function Checkbox({ checked, onChange, invalid, children }: CheckboxProps) {
  return (
    <label className="checkbox" data-invalid={invalid || undefined} data-checked={checked || undefined}>
      <input
        type="checkbox"
        className="checkbox__input"
        checked={checked}
        aria-invalid={invalid || undefined}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="checkbox__box" aria-hidden>
        <Check size={12} strokeWidth={2} />
      </span>
      <span className="checkbox__text t-small">{children}</span>
    </label>
  )
}
