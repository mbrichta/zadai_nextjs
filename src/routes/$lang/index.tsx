import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomePage } from '@/components/home-page'
import { MarketingLayout } from '@/components/marketing-layout'
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n/config'
import { loadLocalePage } from '@/lib/i18n/loader'

export const Route = createFileRoute('/$lang/')({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) {
      throw redirect({ to: '/' })
    }
    if (params.lang === defaultLocale) {
      throw redirect({ to: '/' })
    }
  },
  loader: ({ params }) => loadLocalePage(params.lang as Locale),
  component: LocalizedHomeRoute,
})

function LocalizedHomeRoute() {
  const { dict, lang } = Route.useLoaderData()

  return (
    <MarketingLayout dictionary={dict} lang={lang}>
      <HomePage dictionary={dict} />
    </MarketingLayout>
  )
}
