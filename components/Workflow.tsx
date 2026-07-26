"use client";

import { useEffect, useRef } from "react";
import { Section } from "./ui/Section";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Diskusi & Konsultasi",
    description: "Saya akan mendengarkan ide, tujuan bisnis, dan kebutuhan Anda secara mendalam. Kita akan mendiskusikan scope, timeline, dan estimasi biaya secara transparan.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Perencanaan & Strategi",
    description: "Menyusun roadmap pengerjaan, arsitektur sistem, pemilihan teknologi terbaik, dan timeline pelaksanaan project yang terukur.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Desain UI/UX",
    description: "Merancang wireframe dan visual interface yang modern, intuitif, serta responsif sesuai identitas brand dan kenyamanan pengguna.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Pengembangan & Coding",
    description: "Tahap implementasi kode dengan standar kualitas tinggi, cepat, SEO-friendly, dan responsive. Progress dilaporkan secara berkala.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Pengujian & QA",
    description: "Website atau aplikasi diuji di berbagai perangkat, browser, dan skenario penggunaan untuk menjamin performa optimum bebas bug.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Peluncuran & Support",
    description: "Deployment ke server production, konfigurasi domain & SSL, serta sesi pendampingan awal dan dukungan pasca peluncuran.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
];

export function Workflow() {
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
    <Section id="workflow" variant="soft" ref={sectionRef}>
      {/* Header */}
      <div className="text-center mb-16 animate-on-scroll">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2 px-3 py-1 rounded-full bg-[var(--color-surface-violet-soft)] border border-[var(--color-hairline)] shadow-xs">
          Proses Kerja
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)] mt-2">
          Bagaimana Proses Pengerjaannya?
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Alur kerja terstruktur dan transparan untuk memastikan setiap project berjalan lancar, tepat waktu, dan berkualitas tinggi.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central Vertical Line (Responsive: Left-aligned on mobile, Center-aligned on Desktop) */}
        <div className="absolute left-6 lg:left-1/2 top-6 bottom-6 w-0.5 bg-gradient-to-b from-[var(--color-surface-violet-soft)] via-[var(--color-hairline)] to-[var(--color-surface-violet-soft)] -translate-x-1/2" />

        {/* Timeline Steps */}
        <div className="space-y-8 lg:space-y-12">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative animate-on-scroll group"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                {/* Mobile Icon Badge (Anchored on left-6 vertical line) */}
                <div className="lg:hidden absolute left-6 -translate-x-1/2 top-6 z-10 w-12 h-12 rounded-full bg-[var(--color-surface-violet-soft)] text-[var(--color-primary)] flex items-center justify-center border-4 border-[var(--color-canvas)] shadow-md group-hover:scale-105 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Desktop Center Icon Badge (Anchored on 50% vertical line) */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 w-14 h-14 rounded-full bg-[var(--color-surface-violet-soft)] text-[var(--color-primary)] items-center justify-center border-4 border-[var(--color-canvas)] shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {step.icon}
                </div>

                {/* Grid Layout (Mobile: pl-14 to clear icon, Desktop: Alternating 2 columns) */}
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
                  {/* Left Column */}
                  <div className={`pl-14 lg:pl-0 ${isEven ? "lg:col-start-1" : "hidden lg:block lg:col-start-1"}`}>
                    {isEven && <StepCard step={step} alignment="left" />}
                  </div>

                  {/* Right Column */}
                  <div className={`pl-14 lg:pl-0 ${!isEven ? "lg:col-start-2" : "hidden lg:block lg:col-start-2"}`}>
                    {!isEven && <StepCard step={step} alignment="right" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function StepCard({ step }: { step: Step; alignment: "left" | "right" }) {
  return (
    <div className="bg-[var(--color-canvas)] border border-[var(--color-hairline)] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[var(--color-surface-teal-mid)]/40 transition-all duration-300 relative overflow-hidden group/card">
      {/* Subtle top accent bar on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-surface-violet-soft)] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

      {/* Step Badge */}
      <div className="flex items-center justify-between mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[var(--color-surface-violet-soft)] text-[var(--color-primary)] border border-[var(--color-hairline)] shadow-xs">
          Langkah {step.number}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-display-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-ink)] group-hover/card:text-[var(--color-surface-teal-mid)] transition-colors">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)] mt-2 leading-relaxed">
        {step.description}
      </p>
    </div>
  );
}
