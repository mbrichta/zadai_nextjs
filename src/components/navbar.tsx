import { useState } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  type Locale,
} from '@/lib/i18n/config'
import { localePath, switchLocalePath } from '@/lib/i18n/paths'

type NavbarDictionary = {
  nav: {
    items: {
      home: string
      services: string
      aboutUs: string
      howWeWork: string
      blog: string
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

const LANG_OPTIONS: { code: Locale; emoji: string }[] = [
  { code: 'en-US', emoji: '🇺🇸' },
  { code: 'de-DE', emoji: '🇩🇪' },
  { code: 'es-ES', emoji: '🇪🇸' },
]

const NAV_LINKS = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'services', href: '#services' },
  { labelKey: 'aboutUs', href: '#team' },
  { labelKey: 'howWeWork', href: '#how-we-work' },
  { labelKey: 'contactUs', href: '/contact' },
] as const

export function Navbar({ dictionary, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [langDropdownOpen, setLangDropdownOpen] = useState(false)
  const { pathname } = useLocation()

  const getLocalizedPath = (code: Locale) => switchLocalePath(pathname, code)

  const { items, scheduleCallLabel, openMenuLabel, languageSwitcherLabel } =
    dictionary.nav

  const navHref = (href: string) => {
    if (href.startsWith('#')) return href
    return localePath(lang, href)
  }

  return (
    <nav className="fixed w-full bg-primary supports-[backdrop-filter]:bg-primary z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0">
            <Link
              to={localePath(lang, '/')}
              className="hover:text-[#8BA793] text-[#8BA793]/70 text-xl font-semibold"
            >
              <img
                src="/images/logo.png"
                alt="Logo"
                className="w-[100px] md:w-[130px]"
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8 flex-1 ml-8 sm:text-sm justify-end mr-4">
            {NAV_LINKS.map((navItem) => {
              const label = items[navItem.labelKey]
              const href = navHref(navItem.href)
              if (href.startsWith('#')) {
                return (
                  <a
                    key={navItem.labelKey}
                    href={href}
                    className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {label}
                  </a>
                )
              }
              return (
                <Link
                  key={navItem.labelKey}
                  to={href}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Button
              variant="secondary"
              className="bg-[#8BA793] text-white hover:bg-[#8BA793]/70"
              asChild
            >
              <a
                href="https://calendly.com/28mathias23/llamada-60min"
                target="_blank"
                rel="noopener noreferrer"
              >
                {scheduleCallLabel}
              </a>
            </Button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                aria-label={languageSwitcherLabel}
              >
                <Globe className="w-5 h-5" />
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-20 bg-white shadow-lg border rounded">
                  {LANG_OPTIONS.map(({ code, emoji }) => (
                    <Link
                      key={code}
                      to={getLocalizedPath(code)}
                      className="flex items-center justify-center px-3 py-2 text-xl hover:bg-gray-100"
                      onClick={() => setLangDropdownOpen(false)}
                    >
                      {emoji}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden ml-auto">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">{openMenuLabel}</span>
              {isOpen ? (
                <X
                  className="block h-6 w-6 text-primary-foreground/60"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="block h-6 w-6 text-primary-foreground/60"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary border-b">
          {NAV_LINKS.map((navItem) => {
            const label = items[navItem.labelKey]
            const href = navHref(navItem.href)
            if (href.startsWith('#')) {
              return (
                <a
                  key={navItem.labelKey}
                  href={href}
                  className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary/10 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {label}
                </a>
              )
            }
            return (
              <Link
                key={navItem.labelKey}
                to={href}
                className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            )
          })}

          <Button
            variant="secondary"
            className="w-full bg-[#8BA793] text-white hover:bg-[#8BA793]/70"
            asChild
          >
            <a
              href="https://calendly.com/28mathias23/llamada-60min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 block text-center"
              onClick={() => setIsOpen(false)}
            >
              {scheduleCallLabel}
            </a>
          </Button>

          <div className="relative px-3 py-2 flex justify-center">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 text-primary-foreground/60 hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
              aria-label={languageSwitcherLabel}
            >
              <Globe className="w-5 h-5" />
            </button>
            {langDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-20 bg-white shadow-lg border rounded">
                {LANG_OPTIONS.map(({ code, emoji }) => (
                  <Link
                    key={code}
                    to={getLocalizedPath(code)}
                    className="flex items-center justify-center px-3 py-2 text-xl hover:bg-gray-100"
                    onClick={() => {
                      setLangDropdownOpen(false)
                      setIsOpen(false)
                    }}
                  >
                    {emoji}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
