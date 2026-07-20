import { useContext } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { BackgroundAudioContext } from '@/context/BackgroundAudioContext'
import { useI18n } from '@/context/I18nContext'

export function BackgroundMusic() {
  const { m } = useI18n()
  const audio = useContext(BackgroundAudioContext)
  if (!audio) return null

  const { muted, needsTap, toggleMute, trackId, tracks, selectTrack } = audio
  const showHint = muted || needsTap

  return (
    <div className="fixed bottom-[4.75rem] left-3 z-50 sm:bottom-5 sm:left-5 lg:bottom-6 lg:left-6">
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink/80 text-soft-white shadow-[0_8px_28px_rgba(255,46,147,0.22)] backdrop-blur transition hover:border-cyan/40 hover:text-cyan"
            aria-label={showHint ? m.audio.unmute : m.audio.mute}
            aria-pressed={!showHint}
          >
            {showHint ? <VolumeX size={18} aria-hidden /> : <Volume2 size={18} aria-hidden />}
          </button>

          <div
            className="inline-flex rounded-full border border-white/15 bg-ink/80 p-1 backdrop-blur"
            role="group"
            aria-label="Background track"
          >
            {tracks.map((track) => {
              const active = track.id === trackId
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => selectTrack(track.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    active
                      ? 'bg-gradient-book text-soft-white'
                      : 'text-muted hover:text-soft-white'
                  }`}
                  aria-pressed={active}
                >
                  {track.shortLabel}
                </button>
              )
            })}
          </div>
        </div>

        {showHint && (
          <p className="rounded-full border border-white/10 bg-ink/70 px-2.5 py-1 text-[10px] tracking-wide text-muted backdrop-blur">
            {m.audio.tap}
          </p>
        )}
      </div>
    </div>
  )
}
