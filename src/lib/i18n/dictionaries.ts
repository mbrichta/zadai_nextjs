import type { Locale } from './config'

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  'en-US': () => import('@/dictionaries/en.json').then((m) => m.default),
  'de-DE': () => import('@/dictionaries/de.json').then((m) => m.default),
  'es-ES': () => import('@/dictionaries/es.json').then((m) => m.default),
}

export type Dictionary = Record<string, unknown>

export async function getDictionary(locale: string): Promise<Dictionary> {
  const loader = dictionaries[locale as Locale]
  if (!loader) {
    throw new Error(`Unsupported locale: ${locale}`)
  }
  return loader()
}
