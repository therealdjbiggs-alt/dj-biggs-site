import { useI18n } from '@/context/I18nContext'
import { usePrefersReducedMotion } from '@/hooks/useUi'

function MarqueeTrack({
  labels,
  ariaHidden,
}: {
  labels: string[]
  ariaHidden?: boolean
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-8 px-4"
      aria-hidden={ariaHidden}
    >
      {labels.map((label) => (
        <li key={label} className="flex items-center gap-8">
          <span className="whitespace-nowrap font-display text-sm font-semibold tracking-[0.18em] text-soft-white/90 uppercase sm:text-base">
            {label}
          </span>
          <span
            className="h-1.5 w-1.5 rounded-full bg-neon-pink shadow-[0_0_10px_rgba(255,46,147,0.8)]"
            aria-hidden
          />
        </li>
      ))}
    </ul>
  )
}

export function EventMarquee() {
  const { m } = useI18n()
  const reduced = usePrefersReducedMotion()

  return (
    <section
      className="relative border-y border-white/5 bg-charcoal/80 py-4"
      aria-label="Event types"
    >
      <div className="overflow-hidden">
        <div
          className={`flex w-max ${reduced ? '' : 'animate-[marquee_40s_linear_infinite] hover:[animation-play-state:paused]'}`}
        >
          <MarqueeTrack labels={m.eventTypes} />
          <MarqueeTrack labels={m.eventTypes} ariaHidden />
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[marquee_40s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  )
}
