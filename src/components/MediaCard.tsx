import { useEffect, useRef } from 'react'
import type { GalleryMediaItem } from '@/types'
import { useInView } from '@/hooks/useUi'

type Props = {
  item: GalleryMediaItem
  className?: string
}

export function MediaCard({ item, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, 0.35, '80px')

  useEffect(() => {
    const video = videoRef.current
    if (!video || item.type !== 'video') return

    if (inView) {
      void video.play().catch(() => {
        /* Autoplay may be blocked; poster still shows */
      })
    } else {
      video.pause()
    }
  }, [inView, item.type])

  const sizeClass =
    item.orientation === 'portrait'
      ? 'w-[220px] sm:w-[260px] aspect-[3/4]'
      : item.orientation === 'square'
        ? 'w-[220px] sm:w-[240px] aspect-square'
        : 'w-[280px] sm:w-[340px] aspect-video'

  return (
    <figure
      ref={ref}
      className={`group relative shrink-0 overflow-hidden rounded-2xl neon-edge ${sizeClass} ${className}`}
    >
      {item.type === 'video' ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={item.source}
          poster={item.poster}
          muted
          playsInline
          loop
          preload="metadata"
          aria-label={item.alt}
        />
      ) : (
        <img
          src={item.source}
          alt={item.alt}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      )}
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-4 pt-12">
        <span className="rounded-full border border-white/15 bg-ink/50 px-2.5 py-1 text-[10px] tracking-[0.16em] text-soft-white uppercase backdrop-blur">
          {item.eventType}
          {item.type === 'video' ? ' · Video' : ''}
        </span>
      </figcaption>
    </figure>
  )
}
