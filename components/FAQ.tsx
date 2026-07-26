"use client";

import { useEffect, useRef } from "react";
import { Section } from "./ui/Section";
import { Accordion } from "./ui/Accordion";

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
      "Prosesnya dimulai dengan diskusi untuk memahami kebutuhan Anda, kemudian saya buatkan dokumen perencanaan dan timeline. Setelah disepakati, saya mulai dengan design terlebih dahulu, baru kemudian development. Anda akan mendapatkan update progress secara berkala.",
  },
  {
    question: "Apakah bisa revisi?",
    answer:
      "Ya, setiap project sudah termasuk revisi sesuai dengan scope yang disepakati di awal. Biasanya saya berikan 2-3 revisi untuk design dan fitur utama. Revisi di luar scope akan didiskusikan terpisah.",
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
      "Tentu! Saya biasa bekerja dengan klien dari berbagai kota melalui chat, video call, dan tools kolaborasi online. Asalkan ada komunikasi yang baik, kerja sama jarak jauh bukan masalah.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "Pembayaran biasanya dilakukan dengan sistem DP minimal 30% di awal dan pelunasan setelah project selesai. Untuk project besar, bisa dipecah menjadi beberapa tahapan dengan pembayaran per tahapan.",
  },
];

export function FAQ() {
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
    <Section id="faq" variant="light" ref={sectionRef}>
      <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
        {/* Left - Header */}
        <div className="lg:col-span-1 animate-on-scroll">
          <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2">
            FAQ
          </span>
          <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)] mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)]">
            Berikut beberapa jawaban untuk pertanyaan yang sering diajukan. Jika ada pertanyaan lain, jangan ragu untuk menghubungi saya.
          </p>
        </div>

        {/* Right - Accordion */}
        <div className="lg:col-span-2 animate-on-scroll">
          <Accordion items={faqItems} />
        </div>
      </div>
    </Section>
  );
}
