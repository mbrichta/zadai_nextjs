import { defaultLocale, type Locale } from '@/lib/i18n/config'
import { getDictionary } from '@/lib/i18n/dictionaries'

export async function loadLocalePage(locale: Locale) {
  const dict = await getDictionary(locale)
  return { dict, lang: locale }
}

export async function loadDefaultLocalePage() {
  return loadLocalePage(defaultLocale)
}
