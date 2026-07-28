"use client";

import { useEffect, useRef } from "react";
import { animate, set } from "animejs";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";
import { Service3DIcon, ServiceIconType } from "./Service3DIcon";

const services: Array<{
  iconType: ServiceIconType;
  title: string;
  description: string;
}> = [
  {
    iconType: "landing-page",
    title: "Landing Page",
    description: "Halaman landing page yang menarik dan konversi tinggi untuk bisnis atau produk Anda.",
  },
  {
    iconType: "umkm",
    title: "Website UMKM",
    description: "Website modern untuk toko online, warung, atau bisnis lokal agar tampil lebih profesional.",
  },
  {
    iconType: "dashboard",
    title: "Dashboard Admin",
    description: "Sistem manajemen data interaktif dengan tata letak dashboard yang intuitif dan cepat.",
  },
  {
    iconType: "webapp",
    title: "Web Application",
    description: "Aplikasi berbasis web kustom dengan fitur canggih yang dirancang sesuai alur kerja Anda.",
  },
  {
    iconType: "custom",
    title: "Custom Website",
    description: "Website eksklusif dengan desain unik dan integrasi API/database sepenuhnya fleksibel.",
  },
  {
    iconType: "uiux",
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
          {/* Icon Container with 3D Icon */}
          <div
            ref={iconRef}
            className="w-13 h-13 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center mb-5 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-colors duration-300"
          >
            <Service3DIcon type={service.iconType} />
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
                delay: 110,
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
