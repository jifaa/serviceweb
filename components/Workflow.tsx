"use client";

import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";

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
    description:
      "Saya akan mendengarkan ide, tujuan bisnis, dan kebutuhan Anda secara mendalam. Kita akan mendiskusikan scope, timeline, dan estimasi biaya secara transparan.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Perencanaan & Strategi",
    description:
      "Menyusun roadmap pengerjaan, arsitektur sistem, pemilihan teknologi terbaik, dan timeline pelaksanaan project yang terukur.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Desain UI/UX",
    description:
      "Merancang wireframe dan visual interface yang modern, intuitif, serta responsif sesuai identitas brand dan kenyamanan pengguna.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Pengembangan & Coding",
    description:
      "Tahap implementasi kode dengan standar kualitas tinggi, cepat, SEO-friendly, dan responsive. Progress dilaporkan secara berkala.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Pengujian & QA",
    description:
      "Website atau aplikasi diuji di berbagai perangkat, browser, dan skenario penggunaan untuk menjamin performa optimum bebas bug.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Peluncuran & Support",
    description:
      "Deployment ke server production, konfigurasi domain & SSL, serta sesi pendampingan awal dan dukungan pasca peluncuran.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    ),
  },
];

function Workflow() {
  return (
    <Section id="workflow" variant="soft" className="relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block text-micro font-semibold text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Alur Kerja
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)] mt-1">
          Bagaimana Proses Pengerjaannya?
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Alur kerja terstruktur dan transparan untuk memastikan setiap project berjalan lancar, tepat waktu, dan berkualitas tinggi.
        </p>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto px-4 md:px-0">
        {/* Timeline Line: Left on mobile, Center on desktop */}
        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[var(--color-primary)]/40 via-[var(--color-hairline)] to-[var(--color-primary)]/40" />

        <div className="space-y-8 md:space-y-12">
          {steps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="relative flex flex-col md:flex-row items-start"
              >
                {/* Timeline Icon Badge */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-4 z-10 w-11 h-11 rounded-full bg-[var(--color-canvas)] text-[var(--color-primary)] flex items-center justify-center border-2 border-[var(--color-primary)] shadow-lg transition-transform duration-300 hover:scale-110">
                  {step.icon}
                </div>

                {/* Card placement wrapper */}
                <div className={`w-full pl-14 md:pl-0 ${
                  isLeft 
                    ? "md:pr-[calc(50%+2.5rem)] md:text-right" 
                    : "md:pl-[calc(50%+2.5rem)] md:ml-auto md:text-left"
                }`}>
                  <StepCard step={step} isLeft={isLeft} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function StepCard({ step, isLeft }: { step: Step; isLeft: boolean }) {
  return (
    <Card
      variant="feature-light"
      tilt3d={true}
      tiltOptions={{ max: 6, scale: 1.02, glare: true, maxGlare: 0.2 }}
      className="!p-6 border border-[var(--color-hairline)] hover:border-[var(--color-primary)]/40 transition-all duration-300 relative overflow-hidden group/card shadow-sm hover:shadow-xl rounded-2xl"
    >
      <div style={{ transformStyle: "preserve-3d" }}>
        {/* Step Number + Title Row */}
        <div className={`flex items-center gap-3 mb-2 ${isLeft ? "md:flex-row-reverse" : "flex-row"}`}>
          <span className="inline-block px-2.5 py-0.5 text-xs font-bold font-mono rounded-md bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
            {step.number}
          </span>
          <h3
            style={{ transform: "translateZ(15px)" }}
            className="text-display-md font-[family-name:var(--font-inter)] font-semibold text-[var(--color-ink)] group-hover/card:text-[var(--color-primary)] transition-colors"
          >
            {step.title}
          </h3>
        </div>

        {/* Description */}
        <p
          style={{ transform: "translateZ(8px)" }}
          className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)] leading-relaxed"
        >
          {step.description}
        </p>
      </div>
    </Card>
  );
}

export { Workflow };
