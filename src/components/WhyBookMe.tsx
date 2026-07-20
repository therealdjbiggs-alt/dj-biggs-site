import {
  Lightbulb,
  ListMusic,
  MessageCircle,
  Mic2,
  Speaker,
  Users,
} from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { FEATURES } from '@/data/siteContent'
import type { FeatureItem } from '@/types'
import { SectionLogoWatermark } from '@/components/SectionLogoWatermark'

const ICONS = {
  speaker: Speaker,
  crowd: Users,
  mic: Mic2,
  lightbulb: Lightbulb,
  message: MessageCircle,
  list: ListMusic,
} as const

function FeatureCard({
  feature,
  title,
  description,
}: {
  feature: FeatureItem
  title: string
  description: string
}) {
  const Icon = ICONS[feature.icon]
  return (
    <article className="glass-card rounded-2xl p-5 transition duration-300 hover:border-neon-pink/30 sm:p-6">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-cyan">
        <Icon size={20} aria-hidden />
      </div>
      <h3 className="font-display text-lg font-bold text-soft-white">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </article>
  )
}

export function WhyBookMe() {
  const { m } = useI18n()

  return (
    <section
      id="why"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="why-heading"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.12),transparent_55%)]" aria-hidden />
      <SectionLogoWatermark />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">
            {m.why.eyebrow}
          </p>
          <h2
            id="why-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-soft-white sm:text-4xl"
          >
            {m.why.heading}
          </h2>
          <p className="mt-4 text-muted">{m.why.body}</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const copy =
              m.why.features[feature.id as keyof typeof m.why.features]
            return (
              <FeatureCard
                key={feature.id}
                feature={feature}
                title={copy.title}
                description={copy.description}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}
