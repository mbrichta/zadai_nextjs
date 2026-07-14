import { Bot, FileText, GitBranch, LineChart, Wrench } from 'lucide-react'

import { Container } from '@/components/marketing/container'
import { Section, SectionHeader } from '@/components/marketing/section-header'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { dict } from '@/types/dictionary'

type ServicesProps = {
  dictionary: dict
}

const ICONS = [LineChart, FileText, GitBranch, Bot, Wrench]

export function Services({ dictionary }: ServicesProps) {
  const servicesDict = dictionary.services as {
    heading: string
    eyebrow: string
    items: { title: string; description: string }[]
  }
  const { heading, eyebrow, items } = servicesDict

  return (
    <Section id="services">
      <Container>
        <SectionHeader eyebrow={eyebrow} title={heading} />

        <div className="grid grid-cols-1 border border-border bg-card md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => {
            const Icon = ICONS[index % ICONS.length]
            return (
              <Card
                key={item.title}
                className="-m-px rounded-none border-border"
              >
                <CardHeader>
                  <div className="mb-4 flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className="rounded-md font-mono text-[11px]"
                    >
                      {String(index + 1).padStart(2, '0')}
                    </Badge>
                    <Icon className="size-3.5 text-accent" />
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {item.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
