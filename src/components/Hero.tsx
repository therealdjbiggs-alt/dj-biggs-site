import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '@/context/I18nContext'
import { usePrefersReducedMotion } from '@/hooks/useUi'
import { scrollToId } from '@/lib/scroll'
import { Button } from '@/components/ui/Button'

export function Hero() {
  const { m } = useI18n()
  const reduced = usePrefersReducedMotion()

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-24 pt-28 sm:items-center sm:pb-20 sm:pt-24"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-miami-sunset" aria-hidden />
      <div
        className="absolute inset-0 opacity-40"
        aria-hidden
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(7,7,10,0.35) 0%, rgba(7,7,10,0.55) 40%, rgba(7,7,10,0.92) 100%)',
        }}
      />
      <img
        src="/media/photos/portrait-01.jpg?v=2"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full -scale-x-100 object-cover object-[center_12%] opacity-35 mix-blend-luminosity sm:object-[center_8%] lg:object-[28%_10%]"
      />
      <div className="palm-silhouette pointer-events-none absolute inset-0" aria-hidden />

      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          {[...Array(12)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-soft-white/40"
              style={{
                left: `${8 + i * 7}%`,
                top: `${20 + (i % 5) * 12}%`,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.2, 0.7, 0.2] }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 h-px w-24 deco-line sm:w-32" aria-hidden />
          <h1
            id="hero-heading"
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-soft-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {m.hero.headingBefore}{' '}
            <span className="text-gradient-neon">{m.hero.headingAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {m.hero.body}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={() => scrollToId('#book')}>
              {m.hero.ctaAvailability}
            </Button>
            <Button size="lg" variant="secondary" onClick={() => scrollToId('#gallery')}>
              {m.hero.ctaGallery}
            </Button>
          </div>

          <p className="mt-8 text-xs tracking-[0.18em] text-muted uppercase sm:text-sm sm:tracking-[0.2em]">
            {m.serviceLine}
          </p>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition hover:text-soft-white"
        onClick={() => scrollToId('#experience')}
        aria-label={m.hero.scrollAria}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">{m.hero.scroll}</span>
        <ChevronDown className="animate-bounce" size={20} aria-hidden />
      </button>
    </section>
  )
}
