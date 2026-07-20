import { BRAND } from '@/data/siteContent'
import { useBeatLevel } from '@/context/BackgroundAudioContext'
import { usePrefersReducedMotion } from '@/hooks/useUi'

/** Soft centered brand mark — pulses to BG music bass when audio is playing. */
export function SectionLogoWatermark() {
  const beat = useBeatLevel()
  const reduced = usePrefersReducedMotion()
  const live = !reduced && beat > 0.02

  const opacity = live ? 0.09 + beat * 0.2 : undefined
  const scale = live ? 1 + beat * 0.055 : undefined
  const glowPink = live ? 14 + beat * 22 : 16
  const glowPurple = live ? 28 + beat * 36 : 36
  const pinkAlpha = live ? 0.28 + beat * 0.4 : 0.34
  const purpleAlpha = live ? 0.14 + beat * 0.28 : 0.2

  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden
    >
      <img
        src={BRAND.logoSrc}
        alt=""
        className={`h-[min(48vw,300px)] w-auto max-w-[72%] select-none object-contain sm:h-[min(40vw,360px)] ${
          live ? 'section-logo-live' : 'section-logo-pulse'
        }`}
        style={
          live
            ? {
                opacity,
                transform: `scale(${scale})`,
                filter: `drop-shadow(0 0 ${glowPink}px rgba(255, 46, 147, ${pinkAlpha})) drop-shadow(0 0 ${glowPurple}px rgba(139, 92, 246, ${purpleAlpha}))`,
              }
            : undefined
        }
        width={400}
        height={160}
        decoding="async"
      />
    </div>
  )
}
