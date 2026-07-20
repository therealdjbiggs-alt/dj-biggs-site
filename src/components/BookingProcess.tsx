import { useI18n } from '@/context/I18nContext'
import { BOOKING_STEPS } from '@/data/siteContent'
import { scrollToId } from '@/lib/scroll'
import { Button } from '@/components/ui/Button'
import { SectionLogoWatermark } from '@/components/SectionLogoWatermark'

export function BookingProcess() {
  const { m } = useI18n()
  const steps = BOOKING_STEPS.map((step, i) => ({
    ...step,
    title: m.process.steps[i]?.title ?? step.title,
    description: m.process.steps[i]?.description ?? step.description,
  }))

  return (
    <section
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="process-heading"
    >
      <SectionLogoWatermark />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-[0.28em] text-neon-pink uppercase">
            {m.process.eyebrow}
          </p>
          <h2
            id="process-heading"
            className="mt-3 font-display text-3xl font-bold tracking-tight text-soft-white sm:text-4xl"
          >
            {m.process.heading}
          </h2>
        </div>

        {/* Desktop timeline */}
        <ol className="relative mt-14 hidden gap-8 lg:grid lg:grid-cols-3">
          <div
            className="pointer-events-none absolute top-8 right-[8%] left-[8%] h-px deco-line"
            aria-hidden
          />
          {steps.map((step) => (
            <li key={step.id} className="relative">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-navy font-display text-xl font-bold text-gradient-neon shadow-[0_0_30px_rgba(255,46,147,0.2)]">
                {step.step}
              </div>
              <h3 className="font-display text-xl font-bold text-soft-white">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>

        {/* Mobile stacked cards */}
        <ol className="mt-10 space-y-4 lg:hidden">
          {steps.map((step) => (
            <li key={step.id} className="glass-card flex gap-4 rounded-2xl p-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-book font-display text-lg font-bold text-soft-white">
                {step.step}
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-soft-white">{step.title}</h3>
                <p className="mt-2 text-sm text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-10">
          <Button size="lg" onClick={() => scrollToId('#book')}>
            {m.process.cta}
          </Button>
        </div>
      </div>
    </section>
  )
}
