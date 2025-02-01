"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "public/images/logo.png";
import Image from "next/image";

// The dictionary now only needs text for navigation (not language codes)
type NavbarDictionary = {
  nav: {
    items: {
      home: string;
      services: string;
      aboutUs: string;
      howWeWork: string;
      blog: string;
      contactUs: string;
    };
    scheduleCallLabel: string;
    openMenuLabel: string;
    languageSwitcherLabel: string;
  };
};

type NavbarProps = {
  dictionary: NavbarDictionary;
  lang: string; // e.g. "en", "de", "es"
};

// Hard-coded language options with emoji flags:
const LANG_OPTIONS = [
  { code: "en-US", emoji: "🇺🇸" },
  { code: "de-DE", emoji: "🇩🇪" },
  { code: "es-ES", emoji: "🇪🇸" },
];

// The nav routes are also defined in code:
const NAV_LINKS = [
  { labelKey: "home", href: "/" },
  { labelKey: "services", href: "#services" },
  { labelKey: "aboutUs", href: "#team" },
  { labelKey: "howWeWork", href: "#how-we-work" },
  // { labelKey: "blog", href: "/blog" },
  { labelKey: "contactUs", href: "/contact" },
];

export function Navbar({ dictionary, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Helper to preserve the current route while switching languages.
  // It replaces the first (non-empty) path segment with the new language prefix.
  const getLocalizedPath = (code: string) => {
    const pathSegments = pathname.split("/");
    if (pathSegments.length < 2)
      return `/${code}/${pathname.split("/").slice(1).join()}`;

    return `/${code}/${pathname.split("/").slice(2).join()}`;
  };

  const { items, scheduleCallLabel, openMenuLabel, languageSwitcherLabel } =
    dictionary.nav;

  return (
    <nav className="fixed w-full bg-primary supports-[backdrop-filter]:bg-primary z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href={`/${lang}`}
              className="hover:text-[#8BA793] text-[#8BA793]/70 text-xl font-semibold"
            >
              <Image src={logo} alt="Logo" className="w-[100px] md:w-[130px]" />
            </Link>
          </div>

          {/* DESKTOP NAV (hidden on mobile) */}
          <div className="hidden md:flex md:items-center md:space-x-8 flex-1 ml-8 sm:text-sm justify-end mr-4">
            {NAV_LINKS.map((navItem) => {
              const label = items[navItem.labelKey as keyof typeof items];
              return (
                <Link
                  key={navItem.labelKey}
                  href={`/${lang}${navItem.href}`}
                  className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT-SIDE ACTIONS (DESKTOP) */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Button
              variant="secondary"
              className="bg-[#8BA793] text-white hover:bg-[#8BA793]/70"
              asChild
            >
              <Link
                href="https://calendly.com/28mathias23/llamada-60min"
                target="_blank"
              >
                {scheduleCallLabel}
              </Link>
            </Button>

            <div className="relative">
              <button
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
                      href={getLocalizedPath(code)}
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

          {/* MOBILE MENU TOGGLE */}
          <div className="md:hidden ml-auto">
            <button
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

      {/* MOBILE MENU */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary border-b">
          {NAV_LINKS.map((navItem) => {
            const label = items[navItem.labelKey as keyof typeof items];
            return (
              <Link
                key={navItem.labelKey}
                href={`/${lang}${navItem.href}`}
                className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary/10 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          {/* Mobile Action Button */}
          <Button
            variant="secondary"
            className="w-full bg-[#8BA793] text-white hover:bg-[#8BA793]/70"
            asChild
          >
            <Link
              href="https://calendly.com/28mathias23/llamada-60min"
              target="_blank"
              className="px-3 py-2 block text-center"
              onClick={() => setIsOpen(false)}
            >
              {scheduleCallLabel}
            </Link>
          </Button>

          {/* Mobile Language Switcher */}
          <div className="relative px-3 py-2 flex justify-center">
            <button
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
                    href={getLocalizedPath(code)}
                    className="flex items-center justify-center px-3 py-2 text-xl hover:bg-gray-100"
                    onClick={() => {
                      setLangDropdownOpen(false);
                      setIsOpen(false);
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
  );
}
