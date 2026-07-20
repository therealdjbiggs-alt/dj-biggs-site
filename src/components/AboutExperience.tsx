import { Music2, Sparkles, Waves } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { SectionLogoWatermark } from '@/components/SectionLogoWatermark'

const PROOF_ICONS = [Music2, Waves, Sparkles] as const

export function AboutExperience() {
  const { m } = useI18n()

  return (
    <section
      id="experience"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="experience-heading"
    >
      <SectionLogoWatermark />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-3xl neon-edge">
            <img
              src="/media/photos/about-hero-dj.jpg"
              alt={m.about.imgAlt}
              className="aspect-[4/5] w-full object-cover object-[center_20%]"
              loading="lazy"
              width={800}
              height={1000}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs font-semibold tracking-[0.28em] text-cyan uppercase">
            {m.about.eyebrow}
          </p>
          <h2
            id="experience-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-soft-white sm:text-4xl lg:text-5xl"
          >
            {m.about.heading}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {m.about.body}
          </p>

          <ul className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {m.about.proof.map(({ title, text }, i) => {
              const Icon = PROOF_ICONS[i] ?? Music2
              return (
                <li key={title} className="glass-card rounded-2xl p-4">
                  <Icon className="mb-3 text-neon-pink" size={22} aria-hidden />
                  <h3 className="font-display text-sm font-bold text-soft-white">{title}</h3>
                  <p className="mt-1 text-sm text-muted">{text}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
