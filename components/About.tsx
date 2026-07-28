"use client";

import { useRef, useEffect, useState } from "react";
import { Section } from "./ui/Section";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const initAnimations = async () => {
      try {
        const { animate, set, stagger } = await import("animejs");

        if (prefersReducedMotion) {
          if (contentRef.current) {
            contentRef.current.style.opacity = "1";
            contentRef.current.style.transform = "none";
          }
          return;
        }

        const contentEl = contentRef.current;
        const paragraphs = contentEl?.querySelectorAll("p");
        const keyPoints = contentEl?.querySelectorAll(".key-point");

        // Set initial state before observer triggers
        if (contentEl) set(contentEl, { opacity: 0, translateY: 30 });
        if (paragraphs) set(paragraphs, { opacity: 0, translateY: 20 });
        if (keyPoints) set(keyPoints, { opacity: 0, scale: 0.95 });

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                if (contentEl) {
                  animate(contentEl, {
                    opacity: [0, 1],
                    translateY: [30, 0],
                    duration: 700,
                    easing: "easeOutCubic",
                  });
                }

                if (paragraphs && paragraphs.length > 0) {
                  animate(paragraphs, {
                    opacity: [0, 1],
                    translateY: [20, 0],
                    duration: 500,
                    delay: stagger(100),
                    easing: "easeOutCubic",
                  });
                }

                if (keyPoints && keyPoints.length > 0) {
                  animate(keyPoints, {
                    opacity: [0, 1],
                    scale: [0.95, 1],
                    duration: 450,
                    delay: stagger(80, { start: 200 }),
                    easing: "easeOutCubic",
                  });
                }

                observer.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );

        if (sectionRef.current) {
          observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
      } catch (error) {
        console.warn("Animation error in About section:", error);
        if (contentRef.current) {
          contentRef.current.style.opacity = "1";
          contentRef.current.style.transform = "none";
        }
      }
    };

    initAnimations();
  }, [prefersReducedMotion]);

  return (
    <Section id="about" variant="light" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Content */}
        <div ref={contentRef} className="space-y-6">
          <div className="text-center md:text-left">
            <span className="inline-block text-micro font-[family-name:var(--font-inter)] text-[var(--color-primary)] uppercase tracking-wider mb-2">
              Tentang Saya
            </span>
            <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
              Mahasiswa Teknik Informatika yang Passion di Software Engineering
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-body-lg font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)]">
              Hai! Saya Al Ghifari, seorang mahasiswa Teknik Informatika yang
              sedang dalam proses membangun karir di dunia pengembangan software.
            </p>
            <p className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)]">
              Saya sangat menikmati proses mengubah ide menjadi produk digital
              yang nyata. Fokus utama saya adalah web development — mulai dari
              landing page sederhana hingga aplikasi web yang lebih kompleks.
            </p>
            <p className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)]">
              Sebagai mahasiswa, saya terus belajar teknologi terbaru dan
              berusaha memberikan hasil terbaik untuk setiap project yang saya
              kerjakan. Saya percaya bahwa kualitas kerja lebih penting dari
              sekadar pengalaman.
            </p>
          </div>

          {/* Key Points */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            {[
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm0 0v4m0 12v1m8-11h1M5 12H4m13.536-5.636l.707.707m-11.899 11.9l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ),
                text: "Fokus pada hasil"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                text: "Terus belajar"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                ),
                text: "Komunikasi terbuka"
              },
              {
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ),
                text: "Attention to detail"
              },
            ].map((item, index) => (
              <div
                key={index}
                className="key-point flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-canvas-soft)]"
              >
                <span className="text-[var(--color-primary)]">{item.icon}</span>
                <span className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}


