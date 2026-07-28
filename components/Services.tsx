"use client";

import { useEffect, useRef } from "react";
import { animate, set, stagger } from "animejs";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";

const services = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Landing Page",
    description: "Halaman landing page yang menarik dan konversi tinggi untuk bisnis atau produk Anda.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: "Website UMKM",
    description: "Website modern untuk toko online, warung, atau bisnis lokal agar tampil lebih profesional.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Dashboard Admin",
    description: "Sistem manajemen data interaktif dengan tata letak dashboard yang intuitif dan cepat.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "Web Application",
    description: "Aplikasi berbasis web kustom dengan fitur canggih yang dirancang sesuai alur kerja Anda.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Custom Website",
    description: "Website eksklusif dengan desain unik dan integrasi API/database sepenuhnya fleksibel.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "UI/UX Implementation",
    description: "Penerjemahan piksel presisi dari desain Figma menjadi komponen UI modern dan responsif.",
  },
];

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (cardRef.current && iconRef.current) {
      animate(cardRef.current, {
        translateY: -8,
        duration: 350,
        easing: "easeOutCubic",
      });
      animate(iconRef.current, {
        scale: 1.15,
        rotate: 8,
        duration: 350,
        easing: "easeOutBack",
      });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current && iconRef.current) {
      animate(cardRef.current, {
        translateY: 0,
        duration: 300,
        easing: "easeOutCubic",
      });
      animate(iconRef.current, {
        scale: 1,
        rotate: 0,
        duration: 300,
        easing: "easeOutCubic",
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="service-card-item opacity-0 transform translate-y-10"
    >
      <Card
        variant="feature-light"
        tilt3d={true}
        className="h-full group hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-[var(--color-hairline)]"
      >
        <div className="flex flex-col h-full p-2">
          {/* Icon Container */}
          <div
            ref={iconRef}
            className="w-13 h-13 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300"
          >
            {service.icon}
          </div>

          {/* Title */}
          <h3 className="text-heading-md font-bold text-[var(--color-ink)] mb-2.5">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-body-md text-[var(--color-ink-mute)] flex-grow leading-relaxed">
            {service.description}
          </p>
        </div>
      </Card>
    </div>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Header initial state
    if (headerRef.current) {
      set(headerRef.current, { opacity: 0, translateY: 35 });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate Header
            if (headerRef.current) {
              animate(headerRef.current, {
                opacity: [0, 1],
                translateY: [35, 0],
                duration: 650,
                easing: "easeOutCubic",
              });
            }

            // Animate Cards with Wave Stagger
            const cardElements = gridRef.current?.querySelectorAll(".service-card-item");
            if (cardElements && cardElements.length > 0) {
              animate(cardElements, {
                opacity: [0, 1],
                translateY: [45, 0],
                scale: [0.94, 1],
                delay: stagger(110),
                duration: 650,
                easing: "easeOutCubic",
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="services" variant="soft" ref={sectionRef}>
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12">
        <span className="inline-block text-micro font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Layanan Spesialis
        </span>
        <h2 className="text-display-xl font-bold text-[var(--color-ink)] mb-4">
          Apa yang Bisa Saya Bantu?
        </h2>
        <p className="text-body-lg text-[var(--color-ink-mute)] max-w-2xl mx-auto">
          Solusi pengembangan web modern dengan performa tinggi dan desain responsif untuk memajukan bisnis Anda.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </Section>
  );
}

