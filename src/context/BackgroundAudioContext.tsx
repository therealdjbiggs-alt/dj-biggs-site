import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { BG_TRACKS, type BgTrackId } from '@/data/siteContent'
import { usePrefersReducedMotion } from '@/hooks/useUi'

const STORAGE_MUTED = 'djbiggs-bg-muted'
const STORAGE_TRACK = 'djbiggs-bg-track'
const VOLUME = 0.28

type BackgroundAudioContextValue = {
  muted: boolean
  needsTap: boolean
  playing: boolean
  beat: number
  trackId: BgTrackId
  tracks: typeof BG_TRACKS
  toggleMute: () => void
  selectTrack: (id: BgTrackId) => void
}

const BackgroundAudioContext = createContext<BackgroundAudioContextValue | null>(
  null,
)

export { BackgroundAudioContext }

function readWantsSound(): boolean {
  try {
    const saved = localStorage.getItem(STORAGE_MUTED)
    if (saved === 'true') return false
    if (saved === 'false') return true
  } catch {
    /* ignore */
  }
  return true
}

function readTrackId(): BgTrackId {
  try {
    const saved = localStorage.getItem(STORAGE_TRACK)
    if (saved && BG_TRACKS.some((t) => t.id === saved)) {
      return saved as BgTrackId
    }
  } catch {
    /* ignore */
  }
  return 'trap'
}

function persistMuted(muted: boolean) {
  try {
    localStorage.setItem(STORAGE_MUTED, String(muted))
  } catch {
    /* ignore */
  }
}

function persistTrack(id: BgTrackId) {
  try {
    localStorage.setItem(STORAGE_TRACK, id)
  } catch {
    /* ignore */
  }
}

function trackSrc(id: BgTrackId) {
  return (BG_TRACKS.find((t) => t.id === id) ?? BG_TRACKS[0]).src
}

export function BackgroundAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const dataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const smoothRef = useRef(0)
  const rafRef = useRef(0)
  const sourceReady = useRef(false)
  const trackIdRef = useRef<BgTrackId>('trap')

  const [muted, setMuted] = useState(false)
  const [needsTap, setNeedsTap] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [beat, setBeat] = useState(0)
  const [trackId, setTrackId] = useState<BgTrackId>('trap')
  const [ready, setReady] = useState(false)
  const reduced = usePrefersReducedMotion()

  const ensureGraph = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return null

    if (!ctxRef.current) {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext
      ctxRef.current = new Ctx()
    }
    const ctx = ctxRef.current
    if (ctx.state === 'suspended') {
      await ctx.resume()
    }

    if (!sourceReady.current) {
      const source = ctx.createMediaElementSource(audio)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.72
      source.connect(analyser)
      analyser.connect(ctx.destination)
      analyserRef.current = analyser
      dataRef.current = new Uint8Array(
        analyser.frequencyBinCount,
      ) as Uint8Array<ArrayBuffer>
      sourceReady.current = true
    }

    return ctx
  }, [])

  const tryPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return false
    try {
      await ensureGraph()
      await audio.play()
      setMuted(false)
      setNeedsTap(false)
      setPlaying(true)
      persistMuted(false)
      return true
    } catch {
      setMuted(true)
      setNeedsTap(true)
      setPlaying(false)
      return false
    }
  }, [ensureGraph])

  useEffect(() => {
    const initialTrack = readTrackId()
    trackIdRef.current = initialTrack
    setTrackId(initialTrack)
    setMuted(!readWantsSound())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return

    const audio = new Audio(trackSrc(trackIdRef.current))
    audio.loop = true
    audio.preload = 'auto'
    audio.crossOrigin = 'anonymous'
    audio.volume = VOLUME
    audioRef.current = audio

    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    if (readWantsSound()) {
      void tryPlay()
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.pause()
      audio.src = ''
      audioRef.current = null
      void ctxRef.current?.close()
      ctxRef.current = null
      analyserRef.current = null
      dataRef.current = null
      sourceReady.current = false
    }
  }, [ready, tryPlay])

  useEffect(() => {
    if (!ready || !needsTap) return

    const unlock = () => {
      void tryPlay()
    }

    window.addEventListener('pointerdown', unlock, { once: true, capture: true })
    window.addEventListener('keydown', unlock, { once: true, capture: true })
    return () => {
      window.removeEventListener('pointerdown', unlock, true)
      window.removeEventListener('keydown', unlock, true)
    }
  }, [ready, needsTap, tryPlay])

  useEffect(() => {
    if (!ready || reduced) {
      setBeat(0)
      return
    }

    let frame = 0
    let lastPublished = 0
    const tick = () => {
      frame += 1
      const analyser = analyserRef.current
      const data = dataRef.current
      const audio = audioRef.current

      let next = 0
      if (analyser && data && audio && !audio.paused) {
        analyser.getByteFrequencyData(data)
        const bassBins = Math.max(4, Math.floor(data.length * 0.12))
        let sum = 0
        for (let i = 0; i < bassBins; i += 1) sum += data[i] ?? 0
        const raw = sum / (bassBins * 255)
        const shaped = Math.pow(Math.min(1, raw * 1.35), 0.85)
        smoothRef.current += (shaped - smoothRef.current) * 0.35
        next = smoothRef.current
      } else {
        smoothRef.current += (0 - smoothRef.current) * 0.12
        next = smoothRef.current
      }

      if (frame % 2 === 0 && Math.abs(next - lastPublished) > 0.015) {
        lastPublished = next < 0.02 ? 0 : next
        setBeat(lastPublished)
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [ready, reduced])

  const selectTrack = useCallback(
    (id: BgTrackId) => {
      if (id === trackIdRef.current) return
      const audio = audioRef.current
      if (!audio) return

      const wasPlaying = !audio.paused && !muted
      trackIdRef.current = id
      setTrackId(id)
      persistTrack(id)

      audio.pause()
      audio.src = trackSrc(id)
      audio.load()
      smoothRef.current = 0
      setBeat(0)

      if (wasPlaying || !muted) {
        void tryPlay()
      }
    },
    [muted, tryPlay],
  )

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return

    if (muted || needsTap || audio.paused) {
      void tryPlay()
      return
    }

    audio.pause()
    setMuted(true)
    setPlaying(false)
    persistMuted(true)
  }, [muted, needsTap, tryPlay])

  const value = useMemo(
    () => ({
      muted,
      needsTap,
      playing,
      beat,
      trackId,
      tracks: BG_TRACKS,
      toggleMute,
      selectTrack,
    }),
    [muted, needsTap, playing, beat, trackId, toggleMute, selectTrack],
  )

  return (
    <BackgroundAudioContext.Provider value={value}>
      {children}
    </BackgroundAudioContext.Provider>
  )
}

export function useBackgroundAudio() {
  const ctx = useContext(BackgroundAudioContext)
  if (!ctx) {
    throw new Error('useBackgroundAudio must be used within BackgroundAudioProvider')
  }
  return ctx
}

export function useBeatLevel() {
  const ctx = useContext(BackgroundAudioContext)
  return ctx?.beat ?? 0
}
