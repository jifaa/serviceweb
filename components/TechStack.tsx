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

export function TechStack() {
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
    <Section id="tech-stack" variant="soft" ref={sectionRef}>
      {/* Header */}
      <div className="text-center mb-12 animate-on-scroll">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Tech Stack
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Teknologi yang Saya Gunakan
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Stack modern yang saya kuasai untuk membangun website dan aplikasi yang berkualitas
        </p>
      </div>

      {/* Tech Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {techStack.map((tech, index) => (
          <div
            key={index}
            className="group animate-on-scroll"
            style={{ animationDelay: `${index * 50}ms` }}
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
              <span className="text-caption font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink)] text-center">
                {tech.name}
              </span>

              {/* Category */}
              <span className="text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-ink-faint)] text-center">
                {tech.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Additional Note */}
      <div className="text-center mt-8 animate-on-scroll">
        <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)]">
          Selalu terbuka untuk belajar teknologi baru sesuai kebutuhan project
        </p>
      </div>
    </Section>
  );
}
