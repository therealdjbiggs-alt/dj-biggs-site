import { Star } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { TESTIMONIALS } from '@/data/siteContent'
import { SectionLogoWatermark } from '@/components/SectionLogoWatermark'

export function TestimonialsPreview() {
  const { m, t } = useI18n()

  return (
    <section
      id="reviews"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="reviews-heading"
    >
      <SectionLogoWatermark />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-cyan uppercase">
            {m.reviews.eyebrow}
          </p>
          <h2
            id="reviews-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-soft-white sm:text-4xl"
          >
            {m.reviews.heading}
          </h2>
          <p className="mt-4 text-sm text-muted">{m.reviews.body}</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => {
            const copy =
              m.reviews.items[item.id as keyof typeof m.reviews.items]
            return (
              <article key={item.id} className="glass-card relative rounded-3xl p-6">
                <div
                  className="flex gap-1 text-gold"
                  aria-label={t((msg) => msg.reviews.starsAria, { n: item.rating })}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < item.rating ? 'fill-gold text-gold' : 'opacity-30'}
                      aria-hidden
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm italic leading-relaxed text-muted">
                  &ldquo;{copy.reviewText}&rdquo;
                </p>
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="font-display text-sm font-bold text-soft-white">
                    {item.clientName}
                  </p>
                  <p className="text-xs text-muted">
                    {copy.eventType} · {item.eventDate}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
