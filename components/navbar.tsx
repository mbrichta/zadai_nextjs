"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-primary supports-[backdrop-filter]:bg-primary z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-semibold text-primary">
              Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/servicios"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="/sobre-nosotros"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Sobre nostros
            </Link>
            <Link
              href="/precios"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Precios
            </Link>
            <Link
              href="/como-trabajamos"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Como trabajamos
            </Link>
            <Link
              href="/blog"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors"
            >
              Blog
            </Link>
            <Button variant="secondary">Agenda una llamada</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              <span className="sr-only">Open main menu</span>
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
        <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-b">
          <Link
            href="/"
            className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary/10 rounded-md"
          >
            Inicio
          </Link>
          <Link
            href="/servicios"
            className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground rounded-md"
          >
            Servicios
          </Link>
          <Link
            href="/sobre-nosotros"
            className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground rounded-md"
          >
            Sobre nostros
          </Link>
          <Link
            href="/precios"
            className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground rounded-md"
          >
            Precios
          </Link>
          <Link
            href="/como-trabajamos"
            className="block px-3 py-2 text-base font-medium text-primary-foreground/60 hover:text-primary-foreground rounded-md"
          >
            Como trabajamos
          </Link>
          <div className="px-3 py-2">
            <Button className="w-full" variant="secondary">
              Agenda una llamada
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
