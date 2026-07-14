export const locales = ['en-US', 'es-ES', 'de-DE'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en-US'

export const i18nConfig = {
  locales,
  defaultLocale,
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
