import { defaultLocale, isLocale, type Locale } from './config'

/** Prefix for non-default locales; default locale uses clean URLs. */
export function localePath(locale: Locale, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (locale === defaultLocale) {
    return normalized === '/' ? '/' : normalized
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`
}

/** Extract locale from pathname; defaults to en-US when no prefix. */
export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0]
  if (segment && isLocale(segment)) {
    return segment
  }
  return defaultLocale
}

/** Swap locale while preserving the rest of the path. */
export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]
  const rest =
    first && isLocale(first) ? segments.slice(1) : segments
  const suffix = rest.length > 0 ? `/${rest.join('/')}` : ''
  return localePath(nextLocale, suffix || '/')
}
