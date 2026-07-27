"use client";

import { useEffect, useRef } from "react";
import { Section } from "./ui/Section";

const techStack = [
  {
    name: "Next.js",
    category: "Framework",
    color: "#000000",
  },
  {
    name: "React",
    category: "Library",
    color: "#61DAFB",
  },
  {
    name: "TypeScript",
    category: "Language",
    color: "#3178C6",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    color: "#06B6D4",
  },
  {
    name: "Node.js",
    category: "Runtime",
    color: "#339933",
  },
  {
    name: "Laravel",
    category: "Framework",
    color: "#FF2D20",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    color: "#4169E1",
  },
  {
    name: "Supabase",
    category: "Backend",
    color: "#3ECF8E",
  },
  {
    name: "Firebase",
    category: "Backend",
    color: "#FFCA28",
  },
  {
    name: "Docker",
    category: "DevOps",
    color: "#2496ED",
  },
  {
    name: "Git",
    category: "Version Control",
    color: "#F05032",
  },
  {
    name: "Vercel",
    category: "Hosting",
    color: "#000000",
  },
];

// Random stagger helper
function getRandomDelay(baseDelay: number, variance: number, index: number): number {
  const seed = index * 17 + baseDelay; // deterministic pseudo-random
  return baseDelay + (seed % variance);
}

function TechItem({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!itemRef.current) return;

    const initAnimation = async () => {
      const { animate, set } = await import("animejs");

      const item = itemRef.current;

      // Random initial state
      const delay = getRandomDelay(50, 100, index);
      if (item) set(item, { opacity: 0, scale: 0.5, translateY: 20 });

      const observer = new IntersectionObserver(
        async (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const { animate } = await import("animejs");

              animate(item, {
                opacity: [0, 1],
                scale: [0.5, 1.05, 0.95, 1],
                translateY: [20, 0],
                duration: 600,
                delay,
                easing: "easeOutElastic(1, .6)",
              });

              observer.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(item);

      return () => observer.disconnect();
    };

    initAnimation();
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="group"
    >
      <div className="flex flex-col items-center p-4 bg-[var(--color-canvas)] rounded-[var(--radius-lg)] border border-[var(--color-hairline)] hover:border-[var(--color-primary)] hover:shadow-lg transition-all duration-300">
        {/* Icon Placeholder */}
        <div
          className="w-14 h-14 rounded-[var(--radius-md)] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundColor: `${tech.color}20` }}
        >
          <span
            className="text-2xl font-bold"
            style={{ color: tech.color }}
          >
            {tech.name.charAt(0)}
          </span>
        </div>

        {/* Name */}
        <span className="text-caption font-[family-name:var(--font-inter)] text-[var(--color-ink)] text-center">
          {tech.name}
        </span>

        {/* Category */}
        <span className="text-micro font-[family-name:var(--font-inter)] text-[var(--color-ink-faint)] text-center">
          {tech.category}
        </span>
      </div>
    </div>
  );
}

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const initAnimation = async () => {
      const { animate, set } = await import("animejs");

      const header = headerRef.current;
      const span = header.querySelector("span");
      const h2 = header.querySelector("h2");
      const p = header.querySelector("p");

      set(header, { opacity: 0, translateY: 30 });
      if (span) set(span, { opacity: 0 });
      if (h2) set(h2, { opacity: 0, translateY: 20 });
      if (p) set(p, { opacity: 0, translateY: 20 });

      const observer = new IntersectionObserver(
        async (entries) => {
          entries.forEach(async (entry) => {
            if (entry.isIntersecting) {
              const { animate } = await import("animejs");

              animate(header, {
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 600,
                easing: "easeOutExpo",
              });

              if (span) {
                animate(span, {
                  opacity: [0, 1],
                  duration: 400,
                  delay: 200,
                });
              }

              if (h2) {
                animate(h2, {
                  opacity: [0, 1],
                  translateY: [20, 0],
                  duration: 500,
                  delay: 300,
                  easing: "easeOutQuart",
                });
              }

              if (p) {
                animate(p, {
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

      observer.observe(header);

      return () => observer.disconnect();
    };

    initAnimation();
  }, []);

  return (
    <Section id="tech-stack" variant="soft" ref={sectionRef}>
      {/* Header */}
      <div ref={headerRef} className="text-center mb-12">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Tech Stack
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Teknologi yang Saya Gunakan
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Stack modern yang saya kuasai untuk membangun website dan aplikasi yang berkualitas
        </p>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {techStack.map((tech, index) => (
          <TechItem key={tech.name} tech={tech} index={index} />
        ))}
      </div>

      {/* Additional Note */}
      <div className="text-center mt-8">
        <p className="text-body-md font-[family-name:var(--font-inter)] text-[var(--color-ink-mute)]">
          Selalu terbuka untuk belajar teknologi baru sesuai kebutuhan project
        </p>
      </div>
    </Section>
  );
}
