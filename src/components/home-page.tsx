import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import HowWeWork from '@/components/how-we-work'
import { Services } from '@/components/services'
import { Team } from '@/components/team'
import type { Dictionary } from '@/lib/i18n/dictionaries'

export function HomePage({ dictionary }: { dictionary: Dictionary }) {
  return (
    <div className="min-h-screen bg-background">
      <Hero dictionary={dictionary} />
      <Services dictionary={dictionary} />
      <HowItWorks dictionary={dictionary} />
      <Team dictionary={dictionary} />
      <HowWeWork dictionary={dictionary} />
      <ContactSection dictionary={dictionary} />
      <Footer dictionary={dictionary} />
    </div>
  )
}
