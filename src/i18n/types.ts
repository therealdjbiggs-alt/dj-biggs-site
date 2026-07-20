export type Locale = 'en' | 'es'

export const LOCALES: { id: Locale; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'es', label: 'Español', short: 'ES' },
]

export const STORAGE_LOCALE = 'djbiggs-locale'
