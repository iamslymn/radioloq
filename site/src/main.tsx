import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter/opsz.css'
import './styles/tokens.css'
import './styles/base.css'
import { PasswordGate } from './components/PasswordGate'
import { detectLang } from './content/detect'

// oxlint-disable-next-line react/only-export-components
const App = lazy(() => import('./App'))
// oxlint-disable-next-line react/only-export-components
const DesignSystem = lazy(() => import('./pages/DesignSystem'))

const isDesignSystem = window.location.pathname.replace(/\/$/, '') === '/design-system'

// First-time visitors: work out their country's language before the first paint,
// so the page never flashes in one language and then switches to another.
void (isDesignSystem ? Promise.resolve() : detectLang()).then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <PasswordGate>
        <Suspense fallback={null}>{isDesignSystem ? <DesignSystem /> : <App />}</Suspense>
      </PasswordGate>
    </StrictMode>,
  )
})
