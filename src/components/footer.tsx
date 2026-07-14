import { Instagram, LinkedinIcon } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import type { dict } from '@/types/dictionary'

export function Footer({ dictionary }: { dictionary: dict }) {
  const footer = dictionary.footer as {
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
  const { navLinks, socialLinks, legal } = footer

  return (
    <footer className="w-full border-t bg-primary py-8 text-white">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="hover:text-[#8BA793] text-[#8BA793]/70 text-xl font-semibold"
          >
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-[100px] md:w-[130px]"
            />
          </Link>
        </div>

        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-wrap items-center justify-center space-x-4 text-sm">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-300 transition-colors duration-200 hover:text-gray-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex space-x-3">
          <a
            href={socialLinks.linkedIn}
            className="text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.instagram}
            className="text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-6 px-4 text-center text-sm text-gray-400">
        <p className="mb-2 md:mb-1">{legal.copyright}</p>
        <div className="space-x-2">
          <a href="#" className="transition-colors hover:text-gray-200">
            {legal.links.privacyPolicy}
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="transition-colors hover:text-gray-200">
            {legal.links.termsOfService}
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="transition-colors hover:text-gray-200">
            {legal.links.cookiesSettings}
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
