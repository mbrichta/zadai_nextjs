import { Link } from '@tanstack/react-router'
import { Instagram, LinkedinIcon } from 'lucide-react'

import { Container } from '@/components/marketing/container'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import type { dict } from '@/types/dictionary'

export function Footer({ dictionary }: { dictionary: dict }) {
  const footer = dictionary.footer as {
    brandName: string
    tagline: string
    navLinks: { href: string; label: string }[]
    socialLinks: { linkedIn: string; instagram: string }
    legal: {
      copyright: string
      links: {
        privacyPolicy: string
        termsOfService: string
        cookiesSettings: string
      }
    }
  }
  const { brandName, tagline, navLinks, socialLinks, legal } = footer

  return (
    <footer className="bg-background">
      <Container size="wide" className="py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-3">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold text-foreground"
            >
              <span className="flex size-7 items-center justify-center rounded-md border border-foreground/15 bg-foreground text-[11px] font-semibold text-background">
                MB
              </span>
              {brandName}
            </Link>
            <p className="text-sm leading-6 text-muted-foreground">{tagline}</p>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="size-4" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram className="size-4" />
                </a>
              </Button>
            </div>
          </div>

          <nav className="md:pt-1">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">{legal.copyright}</p>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{legal.links.privacyPolicy}</span>
            <span>{legal.links.termsOfService}</span>
            <span>{legal.links.cookiesSettings}</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
