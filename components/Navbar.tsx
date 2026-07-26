"use client";

import { useState, useEffect } from "react";
import GooeyNav from "./GooeyNav";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const sectionElements = navLinks.map((link) =>
        document.querySelector(link.href) as HTMLElement | null
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md border-b border-white/10 transition-all duration-300 ease-out">
      <div className="max-w-[1100px] mx-auto px-[var(--spacing-lg)] md:px-[var(--spacing-xl)]">
        <div className="flex items-center justify-center relative h-16 md:h-20">
          {/* Desktop Navigation - Centered with GooeyNav */}
          <div className="hidden md:flex items-center justify-center">
            <GooeyNav
              items={navLinks}
              activeIndex={activeSection}
              onIndexChange={setActiveSection}
            />
          </div>

          {/* Mobile Menu Button - Positioned Right on Mobile */}
          <button
            className="md:hidden absolute right-0 p-2 rounded-[var(--radius-sm)] text-white hover:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 animate-fade-in">
            <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-gray-300 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
