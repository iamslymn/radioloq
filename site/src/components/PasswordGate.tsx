import { useState, type FormEvent, type ReactNode } from 'react'
import './PasswordGate.css'

const PASSWORD_SHA256 = '53a2ad39c79fa41841de130cc05f8e4a2a00a5c18c293abfe5c008eb503cdfde'
const STORAGE_KEY = 'radioloq-access'

async function sha256(text: string) {
  const bytes = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, '0')).join('')
}

function hasAccess() {
  try {
    return localStorage.getItem(STORAGE_KEY) === PASSWORD_SHA256
  } catch {
    return false
  }
}

export function PasswordGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(hasAccess)
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [busy, setBusy] = useState(false)

  if (unlocked) return children

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    const hash = await sha256(value)
    setBusy(false)
    if (hash === PASSWORD_SHA256) {
      try {
        localStorage.setItem(STORAGE_KEY, hash)
      } catch {
        // Private mode: access lasts for this page load only.
      }
      setUnlocked(true)
    } else {
      setError(true)
      setValue('')
    }
  }

  return (
    <main className="gate">
      <form className="gate__card" onSubmit={submit} noValidate>
        <h1 className="gate__title">Radioloq</h1>
        <p className="gate__text">
          Bu səhifə hüquqi yoxlama mərhələsindədir və hazırda ictimaiyyət üçün əlçatan deyil.
        </p>
        <label className="visually-hidden" htmlFor="gate-password">
          Şifrə
        </label>
        <input
          id="gate-password"
          className="gate__input"
          type="password"
          placeholder="Şifrə"
          autoComplete="current-password"
          autoFocus
          value={value}
          aria-invalid={error || undefined}
          aria-describedby={error ? 'gate-error' : undefined}
          onChange={(e) => {
            setValue(e.target.value)
            setError(false)
          }}
        />
        {error && (
          <p className="gate__error" id="gate-error" role="alert">
            Şifrə yanlışdır. Yenidən cəhd edin.
          </p>
        )}
        <button className="gate__button" type="submit" disabled={busy || !value}>
          Daxil ol
        </button>
      </form>
    </main>
  )
}
