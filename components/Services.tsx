"use client";

import { useEffect, useRef } from "react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Landing Page",
    description: "Halaman landing page yang menarik dan konversi untuk bisnis atau produk Anda.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: "Company Profile",
    description: "Website profil perusahaan yang profesional untuk memperkenalkan bisnis Anda.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Website UMKM",
    description: "Website untuk toko online, warung, atau bisnis kecil lainnya.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Dashboard Admin",
    description: "Sistem manajemen data dengan dashboard yang intuitif dan mudah digunakan.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Web Application",
    description: "Aplikasi web kustom sesuai kebutuhan spesifik bisnis Anda.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Custom Website",
    description: "Website dengan fitur dan desain yang disesuaikan sepenuhnya.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Maintenance",
    description: "Layanan perawatan dan update website secara berkala.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "UI Implementation",
    description: "Konversi desain (Figma, dll) menjadi kode yang siap pakai.",
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Section id="services" variant="soft" ref={sectionRef}>
      {/* Header */}
      <div className="text-center mb-12 animate-on-scroll">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Layanan
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Apa yang Bisa Saya Bantu?
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Berbagai layanan pengembangan website dan aplikasi untuk kebutuhan Anda
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <Card
            key={index}
            variant="feature-light"
            className="group hover:shadow-lg transition-all duration-300 animate-on-scroll"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-col h-full">
              {/* Icon */}
              <div className="w-14 h-14 rounded-[var(--radius-lg)] bg-[var(--color-primary)]/5 flex items-center justify-center mb-4 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)] group-hover:text-[var(--color-on-primary)] transition-all duration-300">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-heading-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-ink)] mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] flex-grow">
                {service.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
