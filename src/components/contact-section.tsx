import ContactFormSmall from './small-contact-form'
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
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <span className="text-sm uppercase text-gray-500 block mb-2">
          {slogan}
        </span>
        <h2 className="text-3xl font-bold mb-2">{heading}</h2>
        <p className="text-gray-600 mb-8">{description}</p>

        <ContactFormSmall dictionary={dictionary} />
      </div>
    </section>
  )
}
