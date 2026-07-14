import { Link, useLocation } from '@tanstack/react-router'
import { Globe, Menu } from 'lucide-react'

import ThemeToggle from '@/components/ThemeToggle'
import { Container } from '@/components/marketing/container'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import type { Locale } from '@/lib/i18n/config'
import { localePath, switchLocalePath } from '@/lib/i18n/paths'

type NavbarDictionary = {
  nav: {
    brandName: string
    items: {
      home: string
      services: string
      aboutMe: string
      howWeWork: string
      contactUs: string
    }
    scheduleCallLabel: string
    openMenuLabel: string
    languageSwitcherLabel: string
  }
}

type NavbarProps = {
  dictionary: NavbarDictionary
  lang: Locale
}

const LANG_OPTIONS: { code: Locale; label: string }[] = [
  { code: 'en-US', label: 'English' },
  { code: 'de-DE', label: 'Deutsch' },
  { code: 'es-ES', label: 'Español' },
]

const NAV_LINKS = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'services', href: '#services' },
  { labelKey: 'aboutMe', href: '#about' },
  { labelKey: 'howWeWork', href: '#how-we-work' },
  { labelKey: 'contactUs', href: '/contact' },
] as const

const CALENDLY_URL = 'https://calendly.com/28mathias23/llamada-60min'

function NavLink({
  href,
  label,
  lang,
  onClick,
  className,
}: {
  href: string
  label: string
  lang: Locale
  onClick?: () => void
  className?: string
}) {
  const resolved = href.startsWith('#') ? href : localePath(lang, href)

  if (href.startsWith('#')) {
    return (
      <a href={resolved} onClick={onClick} className={className}>
        {label}
      </a>
    )
  }

  return (
    <Link to={resolved} onClick={onClick} className={className}>
      {label}
    </Link>
  )
}

export function Navbar({ dictionary, lang }: NavbarProps) {
  const { pathname } = useLocation()
  const {
    brandName,
    items,
    scheduleCallLabel,
    openMenuLabel,
    languageSwitcherLabel,
  } = dictionary.nav

  const getLocalizedPath = (code: Locale) => switchLocalePath(pathname, code)

  const linkClass =
    'text-sm font-medium text-muted-foreground transition-colors hover:text-foreground'

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <Container size="wide">
        <div className="flex h-16 items-center gap-4">
          <Link
            to={localePath(lang, '/')}
            className="flex items-center gap-2 text-sm font-semibold tracking-tight text-foreground"
          >
            <span className="flex size-7 items-center justify-center rounded-md border border-foreground/15 bg-foreground text-[11px] font-semibold text-background">
              MB
            </span>
            <span>{brandName}</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((navItem) => (
              <Button key={navItem.labelKey} variant="ghost" size="sm" asChild>
                <NavLink
                  href={navItem.href}
                  label={items[navItem.labelKey]}
                  lang={lang}
                  className={linkClass}
                />
              </Button>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 md:ml-0">
            <ThemeToggle />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={languageSwitcherLabel}
                >
                  <Globe className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANG_OPTIONS.map(({ code, label }) => (
                  <DropdownMenuItem key={code} asChild>
                    <Link to={getLocalizedPath(code)}>{label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="hidden md:inline-flex" asChild>
              <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                {scheduleCallLabel}
              </a>
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label={openMenuLabel}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader>
                  <SheetTitle>{brandName}</SheetTitle>
                </SheetHeader>
                <nav className="mt-6 flex flex-col gap-2">
                  {NAV_LINKS.map((navItem) => (
                    <Button
                      key={navItem.labelKey}
                      variant="ghost"
                      className="justify-start"
                      asChild
                    >
                      <NavLink
                        href={navItem.href}
                        label={items[navItem.labelKey]}
                        lang={lang}
                      />
                    </Button>
                  ))}
                  <Button className="mt-4" asChild>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {scheduleCallLabel}
                    </a>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  )
}
