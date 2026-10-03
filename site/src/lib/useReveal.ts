import { useEffect, useRef } from 'react'

/**
 * Marks every [data-reveal] descendant (and the root itself) as visible the first
 * time the root scrolls into view. Runs once; never re-hides.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = [
      ...(root.hasAttribute('data-reveal') ? [root] : []),
      ...root.querySelectorAll<HTMLElement>('[data-reveal]'),
    ]
    const show = () => targets.forEach((el) => (el.dataset.visible = 'true'))

    if (!('IntersectionObserver' in window)) return show()

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          show()
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(root)
    return () => io.disconnect()
  }, [])

  return ref
}
