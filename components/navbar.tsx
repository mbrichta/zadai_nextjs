"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the navigation items in a single array
const navItems = [
  { name: "Inicio", href: "/" },
  { name: "Servicios", href: "#services" },
  { name: "Sobre Nosotros", href: "#team" },
  { name: "Cómo Trabajamos", href: "#how-we-work" },
  { name: "Blog", href: "/blog" },
  { name: "Contáctanos", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-primary supports-[backdrop-filter]:bg-primary z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-semibold text-primary">
              Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8 sm:text-sm">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Action Button */}
            <Button
              variant="secondary"
              className="bg-[#8BA793] text-white hover:bg-[#8BA793]/70"
              asChild
            >
              <Link
                href="https://calendly.com/28mathias23/llamada-60min"
                target="_blank"
              >
                Agenda una llamada
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <X
                  className="block h-6 w-6 text-primary-foreground/60"
                  aria-hidden="true"
                />
              ) : (
                <Menu
                  className="block text-primary-foreground/60 h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-primary border-b">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary/10 rounded-md"
              onClick={() => setIsOpen(false)} // Close the menu when a link is clicked
            >
              {item.name}
            </Link>
          ))}

          {/* Action Button */}
          <Button
            variant="secondary"
            className="w-full bg-[#8BA793] text-white hover:bg-[#8BA793]/70"
            asChild
          >
            <Link
              href="https://calendly.com/28mathias23/llamada-60min"
              target="_blank"
              className="px-3 py-2 block text-center"
              onClick={() => setIsOpen(false)} // Close the menu when the button is clicked
            >
              Agenda una llamada
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
