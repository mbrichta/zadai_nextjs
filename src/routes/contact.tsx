import { createFileRoute } from '@tanstack/react-router'
import ContactForm from '@/components/large-contact-form'
import { MarketingLayout } from '@/components/marketing-layout'
import { loadDefaultLocalePage } from '@/lib/i18n/loader'

export const Route = createFileRoute('/contact')({
  loader: () => loadDefaultLocalePage(),
  component: ContactRoute,
})

function ContactRoute() {
  const { dict, lang } = Route.useLoaderData()

  return (
    <MarketingLayout dictionary={dict} lang={lang}>
      <ContactForm dict={dict} />
    </MarketingLayout>
  )
}
