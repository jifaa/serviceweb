"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const projects = [
  {
    id: 1,
    title: "Warung Kopi Nusantara",
    description: "Website company profile dan katalog produk untuk kedai kopi tradisional dengan fitur pemesanan online.",
    techStack: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/portfolio/warung-kopi.jpg",
    demo: "#",
    github: "#",
    featured: true,
  },
  {
    id: 2,
    title: "EduLearn Platform",
    description: "Platform e-learning untuk kursus online dengan fitur video player dan tracking progress.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    image: "/portfolio/edulearn.jpg",
    demo: "#",
    github: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Beauty Salon Dashboard",
    description: "Sistem manajemen appointment dan customer database untuk salon kecantikan.",
    techStack: ["Next.js", "TypeScript", "Firebase"],
    image: "/portfolio/salon-dashboard.jpg",
    demo: "#",
    github: "#",
    featured: false,
  },
  {
    id: 4,
    title: "EventHub Organizer",
    description: "Landing page dan registration system untuk event organizer komunitas mahasiswa.",
    techStack: ["Next.js", "Tailwind CSS", "Supabase"],
    image: "/portfolio/eventhub.jpg",
    demo: "#",
    github: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Personal Blog",
    description: "Blog personal dengan CMS terintegrasi untuk menulis artikel dan portofolio.",
    techStack: ["Next.js", "MDX", "Vercel"],
    image: "/portfolio/blog.jpg",
    demo: "#",
    github: "#",
    featured: false,
  },
  {
    id: 6,
    title: "Inventory Manager",
    description: "Dashboard manajemen inventori untuk UMKM dengan fitur real-time tracking.",
    techStack: ["React", "Express", "MongoDB"],
    image: "/portfolio/inventory.jpg",
    demo: "#",
    github: "#",
    featured: false,
  },
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");

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

  const filters = [
    { label: "Semua", value: "all" },
    { label: "Website", value: "website" },
    { label: "Web App", value: "webapp" },
    { label: "Dashboard", value: "dashboard" },
  ];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "website") return project.title.includes("Blog") || project.title.includes("Warung");
    if (activeFilter === "webapp") return project.title.includes("Platform") || project.title.includes("EventHub");
    if (activeFilter === "dashboard") return project.title.includes("Dashboard") || project.title.includes("Inventory");
    return true;
  });

  return (
    <Section id="portfolio" variant="light" ref={sectionRef}>
      {/* Header */}
      <div className="text-center mb-8 animate-on-scroll">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Portfolio
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Project yang Pernah Dikerjakan
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Berikut beberapa contoh project yang sudah saya selesaikan
        </p>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12 animate-on-scroll">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={`
              px-4 py-2 rounded-[var(--radius-full)] text-button-cap font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600
              transition-all duration-200
              ${activeFilter === filter.value
                ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                : "bg-[var(--color-canvas)] text-[var(--color-ink-mute)] border border-[var(--color-hairline)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <Card
            key={project.id}
            variant="feature-light"
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-on-scroll"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Image Placeholder */}
            <div className="relative aspect-video -mx-6 -mt-6 mb-6 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-surface-teal-deep)] overflow-hidden">
              {/* Placeholder pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>

              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 bg-[var(--color-surface-violet-soft)] text-[var(--color-primary)] rounded-[var(--radius-sm)]">
                    Featured
                  </span>
                </div>
              )}

              {/* Project Initial */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-[var(--color-on-primary)]/30">
                  {project.title.charAt(0)}
                </span>
              </div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-heading-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] mb-4">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 bg-[var(--color-canvas-soft)] text-[var(--color-ink-mute)] rounded-[var(--radius-xs)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3 pt-4 border-t border-[var(--color-hairline)]">
                <Button
                  variant="primary-dark"
                  size="md"
                  className="flex-1"
                  onClick={() => window.open(project.demo, "_blank")}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Demo
                </Button>
                <Button
                  variant="secondary-outline"
                  size="md"
                  onClick={() => window.open(project.github, "_blank")}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* View More */}
      <div className="text-center mt-12 animate-on-scroll">
        <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] mb-4">
          Ingin melihat lebih banyak project?
        </p>
        <Button
          variant="primary-dark"
          onClick={() => window.open("https://github.com", "_blank")}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          Lihat GitHub Profile
        </Button>
      </div>
    </Section>
  );
}
