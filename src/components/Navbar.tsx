import { useEffect, useId, useMemo, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BRAND } from '@/data/siteContent'
import { LanguageToggle, useI18n } from '@/context/I18nContext'
import { useActiveSection, useScrolled } from '@/hooks/useUi'
import { scrollToId } from '@/lib/scroll'
import { Button } from '@/components/ui/Button'

const SECTION_IDS = ['home', 'experience', 'gallery', 'services', 'why', 'reviews', 'book'] as const

export function Navbar() {
  const { m } = useI18n()
  const scrolled = useScrolled(48)
  const sectionIds = useMemo(() => [...SECTION_IDS], [])
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const menuId = useId()

  const navItems = [
    { id: 'home', label: m.nav.home, href: '#home' },
    { id: 'experience', label: m.nav.experience, href: '#experience' },
    { id: 'gallery', label: m.nav.gallery, href: '#gallery' },
    { id: 'services', label: m.nav.services, href: '#services' },
    { id: 'why', label: m.nav.why, href: '#why' },
    { id: 'reviews', label: m.nav.reviews, href: '#reviews' },
  ]

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const go = (href: string) => {
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'glass-nav' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:h-[5rem] sm:px-6 lg:px-8">
        <a
          href="#home"
          className="group flex items-center"
          onClick={(e) => {
            e.preventDefault()
            go('#home')
          }}
          aria-label={m.nav.homeAria}
        >
          <img
            src={BRAND.logoSrc}
            alt={BRAND.name}
            className="h-11 w-auto object-contain sm:h-14 lg:h-[3.75rem] logo-neon-glow"
            width={180}
            height={60}
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={m.nav.primary}>
          {navItems.map((item) => {
            const isActive = active === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  go(item.href)
                }}
                className={`relative rounded-full px-3 py-2 text-sm transition ${
                  isActive ? 'text-soft-white' : 'text-muted hover:text-soft-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-neon-pink via-electric to-sunset"
                    aria-hidden
                  />
                )}
              </a>
            )
          })}
          <LanguageToggle className="ml-2" />
          <Button
            size="md"
            className="ml-2"
            onClick={() => go('#book')}
            aria-label={m.nav.bookNow}
          >
            {m.nav.bookNow}
          </Button>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle />
          <Button size="md" className="!px-4 !py-2 text-sm" onClick={() => go('#book')}>
            {m.nav.bookNow}
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-soft-white"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? m.nav.closeMenu : m.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div id={menuId} className={`lg:hidden ${open ? 'block' : 'hidden'}`} hidden={!open}>
        <nav
          className="border-t border-white/10 bg-ink/95 px-4 py-4 backdrop-blur-xl"
          aria-label={m.nav.mobile}
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="block rounded-xl px-4 py-3.5 text-base text-soft-white hover:bg-white/5"
                  onClick={(e) => {
                    e.preventDefault()
                    go(item.href)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
