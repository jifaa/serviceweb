"use client";

import React, { useEffect, useRef, MutableRefObject } from "react";
import dynamic from "next/dynamic";
import { animate, set } from "animejs";
import { Section } from "./ui/Section";
import { useTilt3D } from "@/lib/use3DTilt";

// Dynamic import for 3D background
const BackgroundScene = dynamic(() => import("./3d/BackgroundScene"), {
  ssr: false,
  loading: () => null,
});

// Technology brand colors - intentionally used for accurate tech recognition
// These are official brand colors for each technology

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
    name: "Figma",
    category: "Design",
    color: "#F24E1E",
  },
  {
    name: "Vercel",
    category: "Deployment",
    color: "#000000",
  },
];

function getRandomDelay(min: number, max: number, seed: number): number {
  return min + ((seed * 9301 + 49297) % 233280) % (max - min);
}

function TechItem({ tech, index }: { tech: typeof techStack[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);

  // Use tilt with external ref to avoid ESLint ref mutation errors
  const tilt = useTilt3D<HTMLDivElement>({
    max: 6,
    scale: 1.05,
    perspective: 800,
    speed: 0.12,
    externalRef: itemRef as MutableRefObject<HTMLDivElement | null>,
  });

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const delay = getRandomDelay(50, 200, index);
    set(item, { opacity: 0, scale: 0.8, translateY: 20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(item, {
              opacity: [0, 1],
              scale: [0.8, 1],
              translateY: [20, 0],
              duration: 500,
              delay,
              easing: "easeOutCubic",
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
      ref={tilt.ref}
      className="group"
      style={tilt.tiltStyle}
      {...tilt.eventHandlers}
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
    <Section id="tech-stack" variant="soft" ref={sectionRef}>
      {/* 3D Animated Background */}
      <BackgroundScene className="absolute inset-0 pointer-events-none opacity-50" />

      {/* Header */}
      <div ref={headerRef} className="relative z-10 text-center mb-12">
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
      <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
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
