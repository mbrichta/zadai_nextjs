import * as React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-primary py-8 text-white">
      {/* Middle section: Nav links, social icons, etc. */}
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        {/* Logo / Branding */}
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <span className="text-lg font-semibold">Logo</span>
        </div>

        {/* Navigation links */}
        <nav className="mb-4 md:mb-0">
          <ul className="flex flex-wrap items-center justify-center space-x-4 text-sm">
            <li>
              <a
                href="#"
                className="text-gray-300 transition-colors duration-200 hover:text-gray-100"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 transition-colors duration-200 hover:text-gray-100"
              >
                Servicios
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 transition-colors duration-200 hover:text-gray-100"
              >
                Sobre Nosotros
              </a>
            </li>
          </ul>
        </nav>

        {/* Social icons */}
        <div className="flex space-x-3">
          <a
            href="#"
            className="text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-gray-300 transition-colors duration-200 hover:text-white"
          >
            <Instagram className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Bottom section: legal links, copyright, etc. */}
      <div className="container mx-auto mt-6 px-4 text-center text-sm text-gray-400">
        <p className="mb-2 md:mb-1">
          © 2024 Your Company. All rights reserved.
        </p>
        <div className="space-x-2">
          <a href="#" className="transition-colors hover:text-gray-200">
            Privacy Policy
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="transition-colors hover:text-gray-200">
            Terms of Service
          </a>
          <span className="mx-1">|</span>
          <a href="#" className="transition-colors hover:text-gray-200">
            Cookies Settings
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
