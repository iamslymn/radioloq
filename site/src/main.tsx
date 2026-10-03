import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter/opsz.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App'

// oxlint-disable-next-line react/only-export-components
const DesignSystem = lazy(() => import('./pages/DesignSystem'))

const isDesignSystem = window.location.pathname.replace(/\/$/, '') === '/design-system'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isDesignSystem ? (
      <Suspense fallback={null}>
        <DesignSystem />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
)
