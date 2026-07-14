import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'

export function MarketingLayout({
  dictionary,
  lang,
  children,
}: {
  dictionary: Dictionary
  lang: Locale
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <Navbar dictionary={dictionary as never} lang={lang} />
      <main className="pt-16">{children}</main>
    </ThemeProvider>
  )
}
