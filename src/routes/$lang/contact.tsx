import ContactForm from '@/components/large-contact-form'
import { MarketingLayout } from '@/components/marketing-layout'
import { type Locale, defaultLocale, isLocale } from '@/lib/i18n/config'
import { loadLocalePage } from '@/lib/i18n/loader'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/$lang/contact')({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.lang)) {
      throw redirect({ to: '/contact' })
    }
    if (params.lang === defaultLocale) {
      throw redirect({ to: '/contact' })
    }
  },
  loader: ({ params }) => loadLocalePage(params.lang as Locale),
  component: LocalizedContactRoute,
})

function LocalizedContactRoute() {
  const { dict, lang } = Route.useLoaderData()

  return (
    <MarketingLayout dictionary={dict} lang={lang}>
      <ContactForm dict={dict} />
    </MarketingLayout>
  )
}
