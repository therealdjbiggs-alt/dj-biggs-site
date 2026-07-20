import { useRef, useState, type PointerEvent } from 'react'
import { useI18n } from '@/context/I18nContext'
import { GALLERY_MEDIA } from '@/data/siteContent'
import { usePrefersReducedMotion } from '@/hooks/useUi'
import { MediaCard } from '@/components/MediaCard'
import { Button } from '@/components/ui/Button'

export function ExperienceReel() {
  const { m } = useI18n()
  const reduced = usePrefersReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const drag = useRef<{ active: boolean; startX: number; scrollLeft: number }>({
    active: false,
    startX: 0,
    scrollLeft: 0,
  })

  const onPointerDown = (e: PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    drag.current = {
      active: true,
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
    }
    el.setPointerCapture(e.pointerId)
    setPaused(true)
  }

  const onPointerMove = (e: PointerEvent) => {
    const el = trackRef.current
    if (!el || !drag.current.active) return
    const dx = e.clientX - drag.current.startX
    el.scrollLeft = drag.current.scrollLeft - dx
  }

  const endDrag = (e: PointerEvent) => {
    const el = trackRef.current
    if (!el) return
    drag.current.active = false
    try {
      el.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    setPaused(false)
  }

  return (
    <section
      id="gallery"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
      aria-labelledby="gallery-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.28em] text-sunset uppercase">
              {m.gallery.eyebrow}
            </p>
            <h2
              id="gallery-heading"
              className="mt-3 font-display text-3xl font-bold tracking-tight text-soft-white sm:text-4xl lg:text-5xl"
            >
              {m.gallery.heading}
            </h2>
            <p className="mt-4 text-muted">{m.gallery.body}</p>
          </div>
          <Button variant="secondary" onClick={() => setModalOpen(true)}>
            {m.gallery.cta}
          </Button>
        </div>
      </div>

      <div
        className="relative mt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex cursor-grab gap-4 overflow-x-auto px-4 pb-4 active:cursor-grabbing sm:px-6 lg:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          role="region"
          aria-label={m.gallery.reelAria}
          tabIndex={0}
        >
          <div
            className={`flex gap-4 ${
              reduced || paused ? '' : 'animate-[reel_55s_linear_infinite]'
            }`}
          >
            {GALLERY_MEDIA.map((item) => (
              <MediaCard key={item.id} item={item} />
            ))}
          </div>
          {/* Visual continuation without duplicating media nodes for video playback */}
          {!reduced && (
            <div className="flex gap-4" aria-hidden>
              {GALLERY_MEDIA.map((item) => (
                <MediaCard
                  key={`loop-${item.id}`}
                  item={{ ...item, type: 'image', source: item.poster }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes reel {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-modal-title"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass-card max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 id="gallery-modal-title" className="font-display text-2xl font-bold">
                  {m.gallery.modalTitle}
                </h3>
                <p className="mt-1 text-sm text-muted">{m.gallery.modalBody}</p>
              </div>
              <Button
                variant="ghost"
                onClick={() => setModalOpen(false)}
                aria-label={m.gallery.closeAria}
              >
                {m.gallery.close}
              </Button>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {GALLERY_MEDIA.map((item) => (
                <img
                  key={item.id}
                  src={item.poster}
                  alt={item.alt}
                  className="aspect-square rounded-xl object-cover"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
