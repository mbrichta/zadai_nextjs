import type { ReactNode } from 'react'

import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={cn(
        'mb-12 space-y-4',
        isCenter && 'mx-auto max-w-3xl text-center',
        className,
      )}
    >
      {eyebrow ? (
        <Badge
          variant="outline"
          className="rounded-md border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[11px] uppercase tracking-normal text-accent"
        >
          {eyebrow}
        </Badge>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        {title}
      </h2>
      {description ? (
        <>
          <Separator className={cn(isCenter && 'mx-auto max-w-xs')} />
          <p className="text-base leading-7 text-muted-foreground">
            {description}
          </p>
        </>
      ) : null}
    </div>
  )
}

type SectionProps = {
  id?: string
  children: ReactNode
  className?: string
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn('border-b border-border py-16 md:py-24', className)}
    >
      {children}
    </section>
  )
}
