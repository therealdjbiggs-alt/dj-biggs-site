export function scrollToId(id: string) {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
