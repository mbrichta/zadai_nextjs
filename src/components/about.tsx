import { CheckCircle2, LinkedinIcon, TerminalSquare } from 'lucide-react'

import { Container } from '@/components/marketing/container'
import { Section, SectionHeader } from '@/components/marketing/section-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import type { dict } from '@/types/dictionary'

type AboutProps = {
  dictionary: dict
}

const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/in/mathias-brichta',
}

export function About({ dictionary }: AboutProps) {
  const about = dictionary.about as {
    heading: string
    eyebrow: string
    name: string
    title: string
    description: string
    highlights: string[]
  }

  return (
    <Section id="about">
      <Container>
        <SectionHeader
          eyebrow={about.eyebrow}
          title={about.heading}
          align="left"
        />

        <Card className="border-border">
          <CardContent className="grid gap-8 p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
            <div className="space-y-5 border-b border-border pb-6 md:border-r md:border-b-0 md:pr-8 md:pb-0">
              <div className="flex size-12 items-center justify-center rounded-md border border-border bg-muted">
                <TerminalSquare className="size-5 text-accent" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">
                  {about.name}
                </h3>
                <p className="font-mono text-sm uppercase text-accent">
                  {about.title}
                </p>
              </div>
              <p className="leading-relaxed text-muted-foreground">
                {about.description}
              </p>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinIcon className="mr-2 size-4" />
                  LinkedIn
                </a>
              </Button>
            </div>

            <div className="space-y-5">
              <p className="font-mono text-xs uppercase text-muted-foreground">
                Working profile
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {about.highlights.map((highlight) => (
                  <div
                    key={highlight}
                    className="flex items-center gap-3 border border-border bg-background p-3"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-accent" />
                    <span className="text-sm font-medium text-foreground">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 border border-border bg-muted/40 p-4 sm:grid-cols-3">
                {['diagnose', 'build', 'handover'].map((item) => (
                  <div key={item}>
                    <p className="font-mono text-[11px] uppercase text-muted-foreground">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </Section>
  )
}
