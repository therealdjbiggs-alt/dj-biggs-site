import { useI18n } from '@/context/I18nContext'
import { BRAND } from '@/data/siteContent'
import { handleNavClick } from '@/lib/navigate'
import { scrollToId } from '@/lib/scroll'

export function Footer() {
  const { m } = useI18n()
  const year = new Date().getFullYear()

  const navItems = [
    { id: 'home', label: m.nav.home, href: '#home' },
    { id: 'experience', label: m.nav.experience, href: '#experience' },
    { id: 'gallery', label: m.nav.gallery, href: '#gallery' },
    { id: 'services', label: m.nav.services, href: '#services' },
    { id: 'why', label: m.nav.why, href: '#why' },
    { id: 'reviews', label: m.nav.reviews, href: '#reviews' },
  ]

  return (
    <footer className="border-t border-white/5 bg-ink pb-28 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <div className="flex items-center">
            <img
              src={BRAND.logoSrc}
              alt={BRAND.name}
              className="h-14 w-auto object-contain logo-neon-glow sm:h-16"
              width={200}
              height={68}
            />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {m.brand.tagline} {m.footer.blurb}
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-wide text-soft-white">
            {m.footer.navigate}
          </h3>
          <ul className="mt-4 space-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="text-sm text-muted transition hover:text-cyan"
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToId(item.href)
                  }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#book"
                className="text-sm text-muted transition hover:text-cyan"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('#book')
                }}
              >
                {m.nav.bookNow}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold tracking-wide text-soft-white">
            {m.footer.connect}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>
              <a
                className="text-cyan transition hover:text-soft-white"
                href={`mailto:${BRAND.email}`}
              >
                {BRAND.email}
              </a>
            </li>
            <li className="pt-2 text-muted/80">{m.brand.area}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            © {year} {BRAND.name}. {m.footer.rights}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="/privacy"
              className="transition hover:text-cyan"
              onClick={(e) => handleNavClick(e, '/privacy')}
            >
              {m.footer.privacy}
            </a>
            <a
              href="/booking-policy"
              className="transition hover:text-cyan"
              onClick={(e) => handleNavClick(e, '/booking-policy')}
            >
              {m.footer.bookingPolicy}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
