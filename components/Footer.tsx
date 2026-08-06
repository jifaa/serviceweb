"use client";

import { useEffect, useRef } from "react";
import { animate, set } from "animejs";

const footerLinks = [
  {
    title: "Navigasi",
    links: [
      { label: "Home", href: "#home", external: false },
      { label: "About", href: "#about", external: false },
      { label: "Services", href: "#services", external: false },
      { label: "Portfolio", href: "#portfolio", external: false },
      { label: "FAQ", href: "#faq", external: false },
      { label: "Contact", href: "#contact", external: false },
    ],
  },
  /*
  {
    title: "Layanan",
    links: [
      { label: "Landing Page", href: "#services", external: false },
      { label: "Company Profile", href: "#services", external: false },
      { label: "Website UMKM", href: "#services", external: false },
      { label: "Dashboard Admin", href: "#services", external: false },
      { label: "Web Application", href: "#services", external: false },
      { label: "Custom Website", href: "#services", external: false },
    ],
  },
  */
  {
    title: "Sosial Media",
    links: [
      { label: "GitHub", href: "https://github.com/jifaa", external: true },
      { label: "Instagram", href: "https://www.instagram.com/thisjifaa._/", external: true },
      { label: "WhatsApp", href: "https://wa.me/6289527718391", external: true },
    ],
  },
];

const socialLinks = [
  {
    name: "GitHub",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    href: "https://github.com/jifaa",
  },
  {
    name: "Instagram",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    href: "https://instagram.com/algifari.dev",
  },
  {
    name: "WhatsApp",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: "https://wa.me/6289527718391",
  },
];

function FooterColumn({ column, index }: { column: typeof footerLinks[0]; index: number }) {
  const columnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const col = columnRef.current;
    if (!col) return;

    set(col, { opacity: 0, translateY: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(col, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 500,
              delay: index * 100,
              easing: "easeOutQuart",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(col);

    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={columnRef}>
      <h4 className="text-body-md text-[var(--neu-foreground)] font-semibold uppercase tracking-wider mb-5">
        {column.title}
      </h4>
      <ul className="space-y-4">
        {column.links.map((link, linkIndex) => (
          <li key={linkIndex}>
            <a
              href={link.href}
              target={link.external ? "_blank" : "_self"}
              rel={link.external ? "noopener noreferrer" : ""}
              className="text-body-md text-[var(--neu-foreground)] opacity-70 hover:text-[var(--neu-accent)] transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialButton({ link, index }: { link: typeof socialLinks[0]; index: number }) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    set(button, { opacity: 0, scale: 0.8 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(button, {
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 400,
              delay: 200 + index * 80,
              easing: "easeOutBack",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(button);

    return () => observer.disconnect();
  }, [index]);

  return (
    <a
      ref={buttonRef}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="neu-sm w-10 h-10 flex items-center justify-center text-[var(--neu-foreground-muted)] hover:text-[var(--neu-accent)] transition-all duration-200"
      aria-label={link.name}
    >
      {link.icon}
    </a>
  );
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const brand = brandRef.current;
    if (!brand) return;

    set(brand, { opacity: 0, translateY: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(brand, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 600,
              easing: "easeOutQuart",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[var(--neu-bg-dark)] border-t border-[var(--neu-bg)]">
      <div className="max-w-[1100px] mx-auto px-[var(--spacing-lg)] md:px-[var(--spacing-xl)] py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div ref={brandRef} className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-3 mb-6">
              <span className="neu-sm px-3 py-2 text-[var(--neu-accent)] font-bold text-xl rounded-[var(--radius-md)]">
                {"</>"}
              </span>
              <span className="font-semibold text-[var(--neu-foreground)] text-lg">
                Al Ghifari
              </span>
            </a>
            <p className="text-body-md text-[var(--neu-foreground)] opacity-70 mb-6 leading-relaxed">
              Mahasiswa Teknik Informatika yang passionate di web development. Terbuka untuk project freelance dan kolaborasi.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((link, index) => (
                <SocialButton key={index} link={link} index={index} />
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, index) => (
            <FooterColumn key={index} column={column} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--neu-bg)]">
        <div className="max-w-[1100px] mx-auto px-[var(--spacing-lg)] md:px-[var(--spacing-xl)] py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-body-md text-[var(--neu-foreground)] opacity-70">
              © {new Date().getFullYear()} Al Ghifari. All rights reserved.
            </p>
            <p className="text-body-md text-[var(--neu-foreground)] opacity-70">
              Dibuat dengan Next.js
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
