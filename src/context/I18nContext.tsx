import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getMessages, interpolate, type Messages } from '@/i18n'
import { LOCALES, STORAGE_LOCALE, type Locale } from '@/i18n/types'

type I18nContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  m: Messages
  t: (get: (messages: Messages) => string, vars?: Record<string, string | number>) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readLocale(): Locale {
  try {
    const saved = localStorage.getItem(STORAGE_LOCALE)
    if (saved === 'en' || saved === 'es') return saved
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en'
  return nav.startsWith('es') ? 'es' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setLocaleState(readLocale())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    document.documentElement.lang = locale
    try {
      localStorage.setItem(STORAGE_LOCALE, locale)
    } catch {
      /* ignore */
    }
  }, [locale, ready])

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
  }, [])

  const m = useMemo(() => getMessages(locale), [locale])

  const t = useCallback(
    (get: (messages: Messages) => string, vars?: Record<string, string | number>) =>
      interpolate(get(m), vars),
    [m],
  )

  const value = useMemo(
    () => ({ locale, setLocale, m, t }),
    [locale, setLocale, m, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale, m } = useI18n()

  return (
    <div
      className={`inline-flex rounded-full border border-white/15 bg-white/5 p-0.5 ${className}`}
      role="group"
      aria-label={m.langSwitch}
    >
      {LOCALES.map((item) => {
        const active = item.id === locale
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setLocale(item.id)}
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide transition ${
              active
                ? 'bg-gradient-book text-soft-white'
                : 'text-muted hover:text-soft-white'
            }`}
            aria-pressed={active}
          >
            {item.short}
          </button>
        )
      })}
    </div>
  )
}
