import type { MouseEvent } from 'react'

/** Lightweight client-side navigation without a router. */
export function navigate(path: string) {
  if (window.location.pathname === path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo(0, 0)
}

export function handleNavClick(event: MouseEvent<HTMLAnchorElement>, path: string) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return
  }
  event.preventDefault()
  navigate(path)
}
