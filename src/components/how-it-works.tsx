import {
  Brain,
  Cloud,
  Database,
  FileText,
  Network,
  Workflow,
} from 'lucide-react'

import { Container } from '@/components/marketing/container'
import { Section, SectionHeader } from '@/components/marketing/section-header'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { dict } from '@/types/dictionary'

type HowItWorksProps = {
  dictionary: dict
}

const ICONS = [FileText, Cloud, Network, Database, Workflow, Brain]

export function HowItWorks({ dictionary }: HowItWorksProps) {
  const howItWorks = dictionary.howItWorks as {
    heading: string
    eyebrow: string
    description: string
    phases: { title: string; points: string[] }[]
  }
  const { heading, eyebrow, description, phases } = howItWorks

  return (
    <Section className="bg-muted/35">
      <Container>
        <SectionHeader
          eyebrow={eyebrow}
          title={heading}
          description={description}
        />

        {/* Desktop timeline */}
        <div className="hidden border border-border bg-card md:block">
          {phases.map((phase, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <Card
                key={phase.title}
                className="-m-px rounded-none border-border"
              >
                <CardHeader className="grid grid-cols-[88px_1fr] gap-6 space-y-0">
                  <div>
                    <Badge
                      variant="outline"
                      className="rounded-md font-mono text-[11px]"
                    >
                      phase {index + 1}
                    </Badge>
                  </div>
                  <div>
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="size-5 text-accent" />
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                    </div>
                    <ul className="grid gap-2 text-sm text-muted-foreground lg:grid-cols-2">
                      {phase.points.map((point) => (
                        <li key={point} className="flex gap-2 leading-relaxed">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardHeader>
              </Card>
            )
          })}
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden">
          <Tabs defaultValue="0">
            <TabsList className="mb-4 flex h-auto w-full flex-wrap">
              {phases.map((phase, index) => (
                <TabsTrigger
                  key={phase.title}
                  value={String(index)}
                  className="text-xs"
                >
                  {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {phases.map((phase, index) => {
              const Icon = ICONS[index % ICONS.length]
              return (
                <TabsContent key={phase.title} value={String(index)}>
                  <Card className="border-border">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Icon className="size-5 text-accent" />
                        <CardTitle className="text-base">
                          {phase.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {phase.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>
              )
            })}
          </Tabs>
        </div>
      </Container>
    </Section>
  )
}
