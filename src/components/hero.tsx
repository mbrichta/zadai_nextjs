import {
  ArrowRight,
  Bot,
  Braces,
  Database,
  FileCheck2,
  GitBranch,
  Workflow,
} from 'lucide-react'

import { Container } from '@/components/marketing/container'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { dict } from '@/types/dictionary'

type HeroProps = {
  dictionary: dict
}

const CALENDLY_URL = 'https://calendly.com/28mathias23/llamada-60min'

const PIPELINE = [
  { label: 'SOPs', icon: FileCheck2 },
  { label: 'Data', icon: Database },
  { label: 'Workflow', icon: Workflow },
  { label: 'Agents', icon: Bot },
]

const SYSTEM_ROWS = [
  ['lead_intake', 'validated', 'crm.sync()'],
  ['invoice_ops', 'queued', 'approval.route()'],
  ['support_triage', 'live', 'agent.assign()'],
]

export function Hero({ dictionary }: HeroProps) {
  const hero = dictionary.hero as {
    badge: string
    name: string
    tagline: string
    subheading: string
    ctaLabel: string
  }

  return (
    <section className="border-b border-border bg-background/80 py-16 md:py-24">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-7">
            <Badge
              variant="outline"
              className="rounded-md border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[11px] uppercase tracking-normal text-accent"
            >
              {hero.badge}
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {hero.name}
            </h1>
            <div className="space-y-4 border-l border-border pl-5">
              <p className="text-balance text-xl font-medium leading-relaxed text-foreground md:text-2xl">
                {hero.tagline}
              </p>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                {hero.subheading}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {hero.ctaLabel}
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#services">View services</a>
              </Button>
            </div>
          </div>

          <div className="panel-surface border border-border p-4 md:p-5">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs uppercase text-muted-foreground">
                  operating system
                </p>
                <p className="mt-1 text-lg font-semibold text-foreground">
                  Business process architecture
                </p>
              </div>
              <Braces className="size-5 text-accent" />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PIPELINE.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="border border-border bg-background p-3"
                >
                  <Icon className="mb-3 size-4 text-accent" />
                  <p className="font-mono text-[11px] uppercase text-muted-foreground">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 border border-border bg-background">
              <div className="grid grid-cols-[1fr_auto] border-b border-border px-3 py-2 font-mono text-[11px] uppercase text-muted-foreground">
                <span>automation queue</span>
                <GitBranch className="size-3.5" />
              </div>
              <div className="divide-y divide-border">
                {SYSTEM_ROWS.map(([name, status, action]) => (
                  <div
                    key={name}
                    className="grid gap-2 px-3 py-3 text-sm sm:grid-cols-[1fr_86px_1fr]"
                  >
                    <span className="font-mono text-foreground">{name}</span>
                    <span className="font-mono text-xs uppercase text-accent">
                      {status}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground sm:text-right">
                      {action}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {['mapped', 'connected', 'automated'].map((metric) => (
                <div
                  key={metric}
                  className="border border-border bg-muted/40 px-3 py-2"
                >
                  <p className="font-mono text-[11px] uppercase text-muted-foreground">
                    {metric}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
