"use client";

import { useEffect, useRef, useState } from "react";
import { animate, set } from "animejs";
import { Section } from "./ui/Section";

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
}

function AccordionItem({ question, answer, index }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    set(item, { opacity: 0, translateY: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(item, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 400,
              delay: index * 80,
              easing: "easeOutQuart",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(item);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="border-b border-[var(--neu-bg-dark)] last:border-b-0 py-5 transition-colors duration-200"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left gap-4 py-2 group cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-heading-md text-[var(--neu-foreground)] group-hover:text-[var(--neu-accent)] transition-colors duration-200 text-left">
          {question}
        </span>
        {/* Chevron Container - Neumorphic */}
        <div className={`flex-shrink-0 w-10 h-10 neu-inset flex items-center justify-center text-[var(--neu-foreground-muted)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'text-[var(--neu-accent)]' : ''}`}>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? "rotate-180 text-[var(--neu-accent)]" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Grid Accordion Container for zero-flicker smooth collapse */}
      <div
        className={`grid transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-4 pb-2">
            <p className="text-body-md text-[var(--neu-foreground)] opacity-70 leading-relaxed">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    question: "Berapa lama waktu pengerjaan website?",
    answer:
      "Waktu pengerjaan bervariasi tergantung kompleksitas project. Landing page sederhana biasanya memakan waktu 3-7 hari, sedangkan aplikasi web kompleks membutuhkan waktu 2-4 minggu.",
  },
  {
    question: "Apakah website yang dibuat sudah responsive?",
    answer:
      "Ya, semua website dan aplikasi web yang saya buat selalu dioptimalkan untuk tampil sempurna di berbagai perangkat (desktop, tablet, dan smartphone).",
  },
  {
    question: "Apakah saya perlu menyediakan desain sendiri?",
    answer:
      "Jika Anda sudah punya desain (misalnya dari Figma), saya bisa mengimplementasikannya. Jika belum, saya juga bisa membantu merancang tata letak dan visual sesuai kebutuhan Anda.",
  },
  {
    question: "Bagaimana dengan maintenance setelah website selesai?",
    answer:
      "Saya memberikan garansi perbaikan bug secara gratis dalam rentang waktu tertentu setelah website diluncurkan. Layanan perawatan berkala juga bisa disepakati bersama.",
  },
  {
    question: "Teknologi apa saja yang digunakan?",
    answer:
      "Saya utamanya menggunakan ekosistem JavaScript/TypeScript modern seperti Next.js, React, Tailwind CSS, serta pustaka pendukung performa tinggi.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran biasanya dilakukan dengan sistem DP di awal dan pelunasan setelah project selesai disetujui.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    const content = contentRef.current;

    if (header) set(header, { opacity: 0, translateY: 30 });
    if (content) set(content, { opacity: 0, translateY: 30 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (header) {
              animate(header, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: "easeOutQuart",
              });
            }
            if (content) {
              animate(content, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                delay: 200,
                easing: "easeOutQuart",
              });
            }
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <Section id="faq" variant="light" ref={sectionRef}>
      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Sticky Header - only within FAQ section */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start lg:h-fit z-10">
          <div ref={headerRef} className="lg:pr-6">
            <span className="inline-block text-micro text-[var(--neu-accent)] uppercase tracking-wider mb-3">
              FAQ
            </span>
            <h2 className="text-display-xl text-[var(--neu-foreground)] mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-body-lg text-[var(--neu-foreground)] opacity-80">
              Beberapa jawaban atas pertanyaan yang sering diajukan calon klien.
            </p>
          </div>
        </div>

        <div ref={contentRef} className="lg:col-span-8">
          <div className="neu rounded-[var(--radius-xl)] p-8">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
