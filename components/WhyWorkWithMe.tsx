"use client";

import { useEffect, useRef } from "react";
import { animate, set, stagger } from "animejs";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";

const reasons = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: "Komunikasi yang Jelas",
    description: "Selalu terbuka untuk diskusi dan memberikan update progress secara berkala.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    title: "Pengerjaan yang Transparan",
    description: "Anda bisa melihat progress project kapan saja. Tidak ada yang disembunyikan.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Responsive Design",
    description: "Website yang terlihat bagus di semua device — desktop, tablet, dan mobile.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Clean Code",
    description: "Kode yang rapi, terstruktur, dan mudah di-maintain di kemudian hari.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Modern Technology",
    description: "Menggunakan teknologi terbaru seperti Next.js, React, dan TypeScript.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    title: "Revisi sesuai Kesepakatan",
    description: "Mendukung revisi sesuai dengan scope yang sudah disepakati di awal.",
  },
];

function ReasonCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    set(card, { opacity: 0, translateY: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(card, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 500,
              delay: index * 90,
              easing: "easeOutCubic",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [index]);

  const handleMouseEnter = () => {
    if (iconRef.current) {
      animate(iconRef.current, {
        rotate: 12,
        scale: 1.15,
        duration: 300,
        easing: "easeOutCubic",
      });
    }
  };

  const handleMouseLeave = () => {
    if (iconRef.current) {
      animate(iconRef.current, {
        rotate: 0,
        scale: 1,
        duration: 250,
        easing: "easeOutCubic",
      });
    }
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Card
        ref={cardRef}
        variant="feature-row"
        tilt3d={true}
        className="group reason-card hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex gap-4">
          <div
            ref={iconRef}
            className="flex-shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-on-primary)]"
          >
            {reason.icon}
          </div>

          <div>
            <h3 className="text-heading-lg font-[family-name:var(--font-inter)] text-[var(--color-ink)] mb-1">
              {reason.title}
            </h3>
            <p className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)]">
              {reason.description}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export function WhyWorkWithMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    set(header, { opacity: 0, translateY: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(header, {
              opacity: [0, 1],
              translateY: [30, 0],
              duration: 600,
              easing: "easeOutExpo",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="why-work-with-me" variant="light" ref={sectionRef}>
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Keunggulan
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Kenapa Kerja Sama dengan Saya?
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Saya berkomitmen memberikan pengalaman kerja sama yang nyaman dan hasil yang memuaskan
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <ReasonCard key={index} reason={reason} index={index} />
        ))}
      </div>
    </Section>
  );
}

