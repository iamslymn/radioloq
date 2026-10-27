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
const Courses = lazy(() => import('./pages/Courses'))
// oxlint-disable-next-line react/only-export-components
const DesignSystem = lazy(() => import('./pages/DesignSystem'))

// courses.radioloq.com serves the same build; /courses is the same page for local preview.
const isCourses = window.location.hostname.startsWith('courses.') || window.location.pathname.replace(/\/$/, '') === '/courses'
const isDesignSystem = window.location.pathname.replace(/\/$/, '') === '/design-system'

// First-time visitors: work out their country's language before the first paint,
// so the page never flashes in one language and then switches to another.
void (isDesignSystem ? Promise.resolve() : detectLang()).then(() => {
  const page = <Suspense fallback={null}>{isDesignSystem ? <DesignSystem /> : isCourses ? <Courses /> : <App />}</Suspense>
  createRoot(document.getElementById('root')!).render(
    // The courses page is open to everyone; the main site stays behind the gate until launch.
    <StrictMode>{isCourses ? page : <PasswordGate>{page}</PasswordGate>}</StrictMode>,
  )
})
