import type { Locale } from '@/i18n/types'
import { en } from '@/i18n/messages/en'
import { es } from '@/i18n/messages/es'

type DeepStringify<T> = T extends string
  ? string
  : T extends ReadonlyArray<infer U>
    ? DeepStringify<U>[]
    : T extends object
      ? { [K in keyof T]: DeepStringify<T[K]> }
      : T

export type Messages = DeepStringify<typeof en>

export const messages: Record<Locale, Messages> = {
  en: en as unknown as Messages,
  es: es as unknown as Messages,
}

export function getMessages(locale: Locale): Messages {
  return messages[locale] ?? messages.en
}

export function interpolate(
  template: string,
  vars?: Record<string, string | number>,
): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  )
}
