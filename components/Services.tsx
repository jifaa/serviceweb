"use client";

import { useEffect, useRef } from "react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";

const services = [
  {
    title: "Landing Page",
    description: "Halaman landing page yang menarik dan konversi untuk bisnis atau produk Anda.",
  },
  {
    title: "Website UMKM",
    description: "Website untuk toko online, warung, atau bisnis kecil lainnya.",
  },
  {
    title: "Dashboard Admin",
    description: "Sistem manajemen data dengan dashboard yang intuitif dan mudah digunakan.",
  },
  {
    title: "Web Application",
    description: "Aplikasi web kustom sesuai kebutuhan spesifik bisnis Anda.",
  },
  {
    title: "Custom Website",
    description: "Website dengan fitur dan desain yang disesuaikan sepenuhnya.",
  },
  {
    title: "UI Implementation",
    description: "Konversi desain (Figma, dll) menjadi kode yang siap pakai.",
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const initAnimation = async () => {
      const { animate, set } = await import("animejs");

      if (!card) return;
      set(card, { opacity: 0, scale: 0.8, translateY: 30 });

      const observer = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { animate, stagger } = await import("animejs");
            if (card) {
              animate(card, {
                opacity: [0, 1],
                scale: [0.8, 1],
                translateY: [30, 0],
                duration: 500,
                delay: index * 80,
                easing: "easeOutQuart",
              });
            }
            observer.disconnect();
          }
        }
      }, { threshold: 0.1 });

      observer.observe(card);
      return () => observer.disconnect();
    };

    initAnimation();
  }, [index]);

  return (
    <Card variant="feature-light" className="group h-full">
      <div ref={cardRef} className="flex flex-col h-full">
        <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
        <p className="text-sm text-muted-foreground flex-grow">{service.description}</p>
      </div>
    </Card>
  );
}

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const initAnimation = async () => {
      const { animate, set } = await import("animejs");
      const section = sectionRef.current;
      if (!section) return;

      const header = section.querySelector("div");
      set(section, { opacity: 0, translateY: 30 });

      const observer = new IntersectionObserver(async (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { animate } = await import("animejs");
            animate(section, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: "easeOutExpo",
            });
            observer.disconnect();
          }
        }
      }, { threshold: 0.1 });

      observer.observe(section);
      return () => observer.disconnect();
    };

    initAnimation();
  }, []);

  return (
    <Section id="services" variant="soft" ref={sectionRef}>
      <div ref={sectionRef} className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Apa yang Bisa Saya Bantu?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
          Berbagai layanan pengembangan website dan aplikasi untuk kebutuhan Anda
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>
    </Section>
  );
}
