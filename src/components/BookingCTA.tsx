import { Mail } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { BRAND } from '@/data/siteContent'
import { BookingForm } from '@/components/booking/BookingForm'

export function BookingCTA() {
  const { m } = useI18n()

  return (
    <section
      id="book"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="book-heading"
    >
      <div className="absolute inset-0 bg-miami-sunset" aria-hidden />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,46,147,0.25), transparent 60%)',
        }}
        aria-hidden
      />
      <div className="palm-silhouette pointer-events-none absolute inset-0 opacity-80" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto mb-6 h-px w-28 deco-line" aria-hidden />
        <h2
          id="book-heading"
          className="font-display text-3xl font-extrabold tracking-tight text-soft-white sm:text-4xl md:text-5xl"
        >
          {m.book.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base text-muted sm:text-lg">
          {m.book.body}
        </p>

        <a
          href={`mailto:${BRAND.email}`}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-soft-white transition hover:border-cyan/40 hover:text-cyan"
        >
          <Mail size={16} aria-hidden />
          {BRAND.email}
        </a>

        <BookingForm />
      </div>
    </section>
  )
}
