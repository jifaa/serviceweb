"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "./ui/Section";

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
}

function AccordionItem({ question, answer, index }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);

  // Entrance animation with stagger
  useEffect(() => {
    if (!itemRef.current) return;

    const initAnimation = async () => {
      const { animate, set } = await import("animejs");

      const item = itemRef.current;

      // Set initial state
      if (item) set(item, { opacity: 0, translateY: 20 });

      const observer = new IntersectionObserver(
        async (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const { animate } = await import("animejs");

              if (item) {
                animate(item, {
                  opacity: [0, 1],
                  translateY: [20, 0],
                  duration: 400,
                  delay: index * 80,
                  easing: "easeOutQuart",
                });
              }

              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(item!);

      return () => observer.disconnect();
    };

    initAnimation();
  }, [index]);

  // Smooth open/close animation
  const handleToggle = async () => {
    const content = contentRef.current;
    if (!content) {
      setIsOpen(!isOpen);
      return;
    }

    const { animate } = await import("animejs");

    if (isOpen) {
      // Close animation
      animate(content, {
        height: [content.scrollHeight, 0],
        opacity: [1, 0],
        duration: 300,
        easing: "easeOutQuart",
        complete: () => setIsOpen(false),
      });
    } else {
      setIsOpen(true);
      // Open animation
      content.style.height = "0px";
      content.style.opacity = "0";
      animate(content, {
        height: [0, content.scrollHeight],
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutQuart",
      });
    }
  };

  return (
    <div ref={itemRef} className="border-b border-[var(--color-hairline)]">
      <button
        onClick={handleToggle}
        className="w-full py-[var(--spacing-xl)] flex items-center justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-body-lg font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          {question}
        </span>
        <svg
          className={`
            w-5 h-5 flex-shrink-0 text-[var(--color-ink-mute)]
            transition-transform duration-300 ease-out
            ${isOpen ? "rotate-180" : ""}
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden"
        style={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-body-md text-[var(--color-ink-mute)] pb-[var(--spacing-xl)]">
          {answer}
        </p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-[var(--color-hairline)]">
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} index={index} />
      ))}
    </div>
  );
}

const faqItems = [
  {
    question: "Apakah Anda menerima project kecil?",
    answer:
      "Ya, saya terbuka untuk project kecil seperti landing page sederhana, blog personal, atau perbaikan fitur kecil. Silakan diskusikan kebutuhan Anda dan kita akan mencari solusi yang sesuai.",
  },
  {
    question: "Berapa lama biasanya pengerjaan project?",
    answer:
      "Lama pengerjaan tergantung kompleksitas project. Landing page sederhana bisa selesai dalam 1-2 minggu, sementara aplikasi web yang lebih kompleks bisa memakan waktu 4-8 minggu. Saya akan memberikan estimasi yang realistis setelah diskusi awal.",
  },
  {
    question: "Bagaimana proses pengerjaannya?",
    answer:
      "Prosesnya dimulai dengan diskusi untuk memahami kebutuhan Anda, kemudian saya buatkan dokumen perencanaan. Setelah disepakati, saya mulai dengan design terlebih dahulu, baru kemudian development. Anda akan mendapatkan update progress secara berkala.",
  },
  {
    question: "Apakah bisa revisi?",
    answer:
      "Ya, setiap project sudah termasuk revisi sesuai dengan scope yang disepakati di awal. Revisi di luar scope akan didiskusikan terpisah.",
  },
  {
    question: "Apakah tersedia layanan maintenance setelah project selesai?",
    answer:
      "Ya, saya menyediakan layanan maintenance opsional setelah project selesai. Ini mencakup update konten, perbaikan bug minor, dan penyesuaian kecil. Biaya maintenance bisa disesuaikan berdasarkan kebutuhan.",
  },
  {
    question: "Bagaimana dengan source code dan hak cipta?",
    answer:
      "Setelah pembayaran selesai, source code akan diberikan sepenuhnya kepada Anda. Anda bebas menggunakan, memodifikasi, atau mengembangkan lebih lanjut tanpa batasan.",
  },
  {
    question: "Apakah bisa kerja sama jarak jauh?",
    answer:
      "Tentu! Saya biasa bekerja dengan klien dari berbagai kota melalui chat. Asalkan ada komunikasi yang baik, kerja sama jarak jauh bukan masalah.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran biasanya dilakukan dengan sistem DP minimal 30% di awal dan pelunasan setelah project selesai.",
  },
];

export function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!headerRef.current || !contentRef.current || !footerRef.current) return;

    const initAnimation = async () => {
      const { animate, set } = await import("animejs");

      const header = headerRef.current;
      const content = contentRef.current;
      const footer = footerRef.current;
      const span = header?.querySelector("span");
      const h2 = header?.querySelector("h2");

      // Set initial states
      if (header) set(header, { opacity: 0, translateX: -30 });
      if (content) set(content, { opacity: 0, translateX: 30 });
      if (footer) set(footer, { opacity: 0, translateY: 20 });

      const observer = new IntersectionObserver(
        async (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const { animate } = await import("animejs");

              // Header animation
              if (header) {
                animate(header, {
                  opacity: [0, 1],
                  translateX: [-30, 0],
                  duration: 600,
                  easing: "easeOutQuart",
                });
              }

              if (content) {
                animate(content, {
                  opacity: [0, 1],
                  translateX: [30, 0],
                  duration: 600,
                  delay: 200,
                  easing: "easeOutQuart",
                });
              }

              if (footer) {
                animate(footer, {
                  opacity: [0, 1],
                  translateY: [20, 0],
                  duration: 500,
                  delay: 400,
                  easing: "easeOutQuart",
                });
              }

              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(sectionRef.current!);

      return () => observer.disconnect();
    };

    initAnimation();
  }, []);

  return (
    <Section id="faq" variant="light" ref={sectionRef}>
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16 items-start">
        {/* Left - Header */}
        <div ref={headerRef} className="lg:col-span-1 lg:sticky lg:top-55 self-start">
          <span className="inline-block text-micro font-[family-name:var(--font-inter)] text-[var(--color-primary)] uppercase tracking-wider mb-2">
            FAQ
          </span>
          <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)] mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        {/* Right - Accordion */}
        <div ref={contentRef} className="lg:col-span-2">
          <Accordion items={faqItems} />
        </div>
      </div>
      <p ref={footerRef} className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)] text-center mt-12">
        Jika ada pertanyaan lain, jangan ragu untuk hubungi saya.
      </p>
    </Section>
  );
}
