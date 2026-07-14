import { About } from '@/components/about'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import HowWeWork from '@/components/how-we-work'
import { Services } from '@/components/services'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function HomePage({ dictionary }: { dictionary: Dictionary }) {
  return (
    <>
      <Hero dictionary={dictionary} />
      <Services dictionary={dictionary} />
      <HowItWorks dictionary={dictionary} />
      <About dictionary={dictionary} />
      <HowWeWork dictionary={dictionary} />
      <ContactSection dictionary={dictionary} />
      <Footer dictionary={dictionary} />
    </>
  )
}
