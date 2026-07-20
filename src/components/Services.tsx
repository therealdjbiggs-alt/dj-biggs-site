import { Briefcase, Heart, Moon, PartyPopper, ArrowRight } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { SERVICES } from '@/data/siteContent'
import type { ServiceItem } from '@/types'
import { scrollToId } from '@/lib/scroll'
import { SectionLogoWatermark } from '@/components/SectionLogoWatermark'

const ICONS = {
  heart: Heart,
  party: PartyPopper,
  briefcase: Briefcase,
  moon: Moon,
} as const

function ServiceCard({
  service,
  title,
  description,
  explore,
}: {
  service: ServiceItem
  title: string
  description: string
  explore: string
}) {
  const Icon = ICONS[service.icon]

  return (
    <article className="group glass-card relative overflow-hidden rounded-3xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(139,92,246,0.18)]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt=""
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <span className="absolute top-4 left-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-ink/60 text-neon-pink backdrop-blur">
          <Icon size={18} aria-hidden />
        </span>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-soft-white">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
        <button
          type="button"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-cyan transition group-hover:gap-3"
          onClick={() => scrollToId('#book')}
        >
          {explore}
          <ArrowRight size={16} aria-hidden />
        </button>
      </div>
    </article>
  )
}

export function Services() {
  const { m } = useI18n()

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="services-heading"
    >
      <SectionLogoWatermark />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-electric uppercase">
            {m.services.eyebrow}
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-soft-white sm:text-4xl"
          >
            {m.services.heading}
          </h2>
          <p className="mt-4 text-muted">{m.services.body}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const copy =
              m.services.items[service.id as keyof typeof m.services.items]
            return (
              <ServiceCard
                key={service.id}
                service={service}
                title={copy.title}
                description={copy.description}
                explore={m.services.explore}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
