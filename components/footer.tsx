import * as React from "react";
import { Instagram, LinkedinIcon } from "lucide-react";
import { dict } from "@/app/[lang]/page";
import Link from "next/link";
import Image from "next/image";
import logo_img from "public/images/logo.png";

export function Footer({ dictionary }: { dictionary: dict }) {
  const { logo, navLinks, socialLinks, legal } = dictionary.footer;

  return (
    <footer className="w-full border-t bg-primary py-8 text-white">
      {/* Middle section: Nav links, social icons, etc. */}
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        {/* Logo / Branding */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="hover:text-[#8BA793] text-[#8BA793]/70 text-xl font-semibold"
          >
            <Image
              src={logo_img}
              alt="Logo"
              className="w-[100px] md:w-[130px]"
            />
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-wrap items-center justify-center space-x-4 text-sm">
            {navLinks.map(
              (link: { href: string; label: string }, index: number) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-300 transition-colors duration-200 hover:text-gray-100"
                  >
                    {link.label}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Social icons */}
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

      {/* Bottom section: legal links, copyright, etc. */}
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
  );
}

export default Footer;
