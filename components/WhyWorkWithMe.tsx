"use client";

import { useEffect, useRef } from "react";
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
    description: "Website yang looks bagus di semua device — desktop, tablet, dan mobile.",
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

export function WhyWorkWithMe() {
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
    <Section id="why-work-with-me" variant="light" ref={sectionRef}>
      {/* Header */}
      <div className="text-center mb-12 animate-on-scroll">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Keunggulan
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Kenapa Kerja Sama dengan Saya?
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Saya berkomitmen memberikan pengalaman kerja sama yang nyaman dan hasil yang memuaskan
        </p>
      </div>

      {/* Reasons Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reasons.map((reason, index) => (
          <Card
            key={index}
            variant="feature-row"
            className="group hover:shadow-md transition-all duration-300 animate-on-scroll"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-[var(--radius-md)] bg-[var(--color-primary)] flex items-center justify-center text-[var(--color-on-primary)] group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Content */}
              <div>
                <h3 className="text-heading-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-ink)] mb-1">
                  {reason.title}
                </h3>
                <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)]">
                  {reason.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
