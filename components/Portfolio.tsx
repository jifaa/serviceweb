"use client";

import { useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const BackgroundScene = dynamic(() => import("./3d/BackgroundScene"), {
  ssr: false,
  loading: () => null,
});

const projects = [
  {
    id: 1,
    title: "CosHub SMD",
    description: " website marketplace cosplay di Samarinda buat promosi komunitas lokal, lengkap dengan fitur jual beli kostum, sewa kostum (rental) buat event dan info event cosplay.",
    image: "/portoimg/coshub.png",
    demo: "https://coshub-smd.vercel.app/",
  },
  {
    id: 2,
    title: "Easler Japan",
    description: " website untuk belajar bahasa Jepang  N5, ada pelajaran terstruktur buat pemula, lengkap dengan fitur latihan harian dan progres (streak).",
    image: "/portoimg/easlerjapan.png",
    demo: "https://easler-japan.vercel.app/",
  },
  {
    id: 3,
    title: "Lesmap",
    description: "website untuk mencari tempat les/kursus di Samarinda, lengkap dengan peta interaktif, filter kategori, radius jarak, harga, dan rute tercepat.",
    image: "/portoimg/lesmap.png",
    demo: "https://lesmap.vercel.app/",
  }
];

export function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <Section id="portfolio" variant="dark" ref={sectionRef} className="relative overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <span className="inline-block text-micro font-semibold text-[var(--neu-accent)] uppercase tracking-wider mb-3">
          Portfolio
        </span>
        <h2 className="text-display-xl text-[var(--neu-foreground)]">
          Project yang Pernah Dikerjakan
        </h2>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card
              variant="neu"
              tilt3d={true}
              tiltOptions={{
                max: 6,
                scale: 1.02,
                glare: false,
              }}
              className="group overflow-hidden h-full flex flex-col justify-between"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative aspect-video -mx-6 -mt-6 mb-6 bg-gradient-to-br from-[var(--neu-accent)] to-[var(--neu-foreground)] rounded-t-[var(--radius-lg)] overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <>
                      {/* Pattern backdrop */}
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />
                      </div>

                      {/* Project Initial */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-5xl font-bold text-white/30">
                          {project.title.charAt(0)}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="px-2">
                  <h3 className="text-heading-lg font-semibold text-[var(--neu-foreground)] mb-2 group-hover:text-[var(--neu-accent)] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-body-md text-[var(--neu-foreground)] opacity-70 mb-4 leading-relaxed">
                    {project.description}
                  </p>


                </div>
              </div>

              {/* Links Footer */}
              <div className="flex gap-3 pt-4 px-2 pb-5 neu-divider mt-4">
                <Button
                  variant="neu-accent"
                  size="md"
                  className="flex-1 !text-black"
                  onClick={() => window.open(project.demo, "_blank")}
                >
                  <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-black font-semibold">Visit</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
