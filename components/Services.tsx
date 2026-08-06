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
      iconType: "mobile",
      title: "Mobile Application",
      description: "Mengembangkan aplikasi mobile untuk android dan ios dengan desain modern dan user-friendly.",
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
        variant="neu"
        tilt3d={true}
        className="h-full group cursor-pointer p-6"
      >
        <div className="flex flex-col h-full">
          {/* Icon Container with Neumorphic Icon */}
          <div
            ref={iconRef}
            className="neu-sm w-14 h-14 flex items-center justify-center mb-6 text-[var(--neu-accent)]"
          >
            <Service3DIcon type={service.iconType} />
          </div>

          {/* Title */}
          <h3 className="text-heading-md font-bold text-[var(--neu-foreground)] mb-3">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-body-md text-[var(--neu-foreground)] opacity-70 flex-grow leading-relaxed">
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
    <Section id="services" variant="dark" ref={sectionRef}>
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16">
        <h2 className="text-display-xl font-bold text-[var(--neu-foreground)] mb-4">
          Apa yang Bisa Saya Bantu?
        </h2>
        <p className="text-body-lg text-[var(--neu-foreground)] opacity-80 max-w-2xl mx-auto">
          Solusi pengembangan web modern dengan performa tinggi dan desain responsif untuk memajukan bisnis Anda.
        </p>
      </div>

      {/* Services Grid */}
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} />
        ))}
      </div>
    </Section>
  );
}
