/**
 * In-page links (#pricing, #how, ...) scroll to their section without putting "#section"
 * in the address bar, so the URL stays plain: https://www.radioloq.com/
 *
 * The scroll is driven here instead of by the browser's built-in smooth scrolling. The
 * built-in version fixes its destination when the click happens, so anything that moves
 * during the trip (images and fonts loading, reveal animations, a touch of the wheel)
 * leaves the page short of the section. This one recalculates the destination every frame
 * and only stops once it has arrived, so the section always ends up directly under the header.
 */

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Breathing room between the bottom of the header and the section's first line. */
const GAP = 24

/**
 * Where the section's top edge should end up on screen. The section's own top padding is
 * tucked behind the sticky header, so no strip of the section above ever shows beneath it;
 * the first line of content still lands at least GAP below the header.
 */
function landingOffset(el: HTMLElement): number {
  const header = document.querySelector<HTMLElement>('.site-header')?.offsetHeight ?? 0
  const padding = parseFloat(getComputedStyle(el).paddingTop) || 0
  return Math.max(0, header + GAP - padding)
}

const targetY = (el: HTMLElement) => {
  const max = document.documentElement.scrollHeight - window.innerHeight
  const y = el.getBoundingClientRect().top + window.scrollY - landingOffset(el)
  return Math.min(Math.max(y, 0), Math.max(max, 0))
}

let cancelRunning: (() => void) | null = null

/** Scrolls until `el` sits just below the header, or until the visitor takes over with their own input. */
function scrollToElement(el: HTMLElement): void {
  cancelRunning?.()

  // `instant` overrides the CSS `scroll-behavior: smooth`, which would otherwise fight every frame.
  const jump = (y: number) => window.scrollTo({ top: y, behavior: 'instant' })

  if (reducedMotion()) {
    jump(targetY(el))
    return
  }

  let raf = 0
  let last = performance.now()
  const started = last
  const stop = () => {
    cancelAnimationFrame(raf)
    for (const t of ['wheel', 'touchstart', 'keydown', 'mousedown'] as const) window.removeEventListener(t, stop)
    if (cancelRunning === stop) cancelRunning = null
  }
  cancelRunning = stop
  // Any input from the visitor takes over immediately.
  for (const t of ['wheel', 'touchstart', 'keydown', 'mousedown'] as const) window.addEventListener(t, stop, { passive: true })

  const step = (now: number) => {
    const dt = Math.min(now - last, 50)
    last = now
    const goal = targetY(el)
    const diff = goal - window.scrollY

    // Safety net: never animate for long; snap to wherever the section currently is.
    if (Math.abs(diff) < 1 || now - started > 2000) {
      jump(goal)
      stop()
      return
    }
    // Ease out: cover a share of the remaining distance each frame, at least 1px so it always finishes.
    const move = diff * (1 - Math.exp(-dt / 110))
    jump(window.scrollY + (Math.abs(move) < 1 ? Math.sign(diff) : move))
    raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

function goTo(id: string): boolean {
  const target = document.getElementById(id)
  if (!target) return false
  scrollToElement(target)
  // Keep keyboard and screen-reader focus in step with the scroll (matters for the skip link).
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
  target.focus({ preventScroll: true })
  return true
}

export function installPlainAnchors(): () => void {
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
    if (!link) return
    const id = decodeURIComponent(link.getAttribute('href')!.slice(1))
    if (!id) return
    if (goTo(id)) e.preventDefault()
  }
  document.addEventListener('click', onClick)

  // A shared link that already carries a hash (…/#pricing) still lands on the section,
  // then the hash is dropped from the address bar.
  const { hash, pathname, search } = window.location
  if (hash.length > 1) {
    requestAnimationFrame(() => {
      if (goTo(decodeURIComponent(hash.slice(1)))) window.history.replaceState(null, '', pathname + search)
    })
  }

  return () => {
    document.removeEventListener('click', onClick)
    cancelRunning?.()
  }
}
