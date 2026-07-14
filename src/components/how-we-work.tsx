import { ArrowRight, CheckCircle2 } from 'lucide-react'

import { Container } from '@/components/marketing/container'
import { Section, SectionHeader } from '@/components/marketing/section-header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { dict } from '@/types/dictionary'

const CALENDLY_URL = 'https://calendly.com/28mathias23/llamada-60min'

export default function HowWeWork({ dictionary }: { dictionary: dict }) {
  const howWeWork = dictionary.howWeWork as {
    heading: string
    eyebrow: string
    subheading: string
    steps: { title: string; content: string }[]
    ctaLabel: string
  }
  const { heading, eyebrow, subheading, steps, ctaLabel } = howWeWork

  return (
    <Section id="how-we-work" className="bg-muted/40">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={heading}
          description={subheading}
        />

        <div className="grid grid-cols-1 border border-border bg-card sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} className="-m-px rounded-none border-border">
              <CardHeader>
                <Badge
                  variant="outline"
                  className="mb-4 rounded-md font-mono text-[11px]"
                >
                  {String(index + 1).padStart(2, '0')}
                </Badge>
                <CardTitle className="flex items-start gap-2 text-base leading-tight">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" />
                  {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button size="lg" asChild>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              {ctaLabel}
              <ArrowRight className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </Container>
    </Section>
  )
}
