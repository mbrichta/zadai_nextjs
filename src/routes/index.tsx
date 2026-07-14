import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/components/home-page'
import { MarketingLayout } from '@/components/marketing-layout'
import { loadDefaultLocalePage } from '@/lib/i18n/loader'

export const Route = createFileRoute('/')({
  loader: () => loadDefaultLocalePage(),
  component: HomeRoute,
})

function HomeRoute() {
  const { dict, lang } = Route.useLoaderData()

  return (
    <MarketingLayout dictionary={dict} lang={lang}>
      <HomePage dictionary={dict} />
    </MarketingLayout>
  )
}
