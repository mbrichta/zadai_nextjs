import type { ReactNode } from 'react'

import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import type { Locale } from '@/lib/i18n/config'
import type { Dictionary } from '@/lib/i18n/dictionaries'

type MarketingLayoutProps = {
  children: ReactNode
  dictionary: Dictionary
  lang: Locale
}

export function MarketingLayout({
  children,
  dictionary,
  lang,
}: MarketingLayoutProps) {
  return (
    <ThemeProvider>
      <div className="marketing-bg min-h-screen">
        <Navbar
          dictionary={dictionary as Parameters<typeof Navbar>[0]['dictionary']}
          lang={lang}
        />
        <main className="pt-16">{children}</main>
        <Toaster />
      </div>
    </ThemeProvider>
  )
}
