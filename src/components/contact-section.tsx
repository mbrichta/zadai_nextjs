import { Container } from '@/components/marketing/container'
import { Section, SectionHeader } from '@/components/marketing/section-header'
import ContactFormSmall from '@/components/small-contact-form'
import type { dict } from '@/types/dictionary'

export default function ContactSection({
  dictionary,
}: {
  dictionary: dict
}) {
  const section = dictionary.contactSection as {
    heading: string
    slogan: string
    description: string
  }
  const { heading, slogan, description } = section

  return (
    <Section>
      <Container>
        <div className="grid gap-8 border border-border bg-card p-6 md:grid-cols-[0.8fr_1.2fr] md:p-8">
          <SectionHeader
            eyebrow={slogan}
            title={heading}
            description={description}
            align="left"
            className="mb-0"
          />
          <div className="border-t border-border pt-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <ContactFormSmall dictionary={dictionary} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
