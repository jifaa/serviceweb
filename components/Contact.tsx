"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const socialLinks = [
  {
    name: "Email",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    value: "akhmad.abid.345@gmail.com",
    href: "mailto:akhmad.abid.345@gmail.com",
    color: "#EA4335",
  },
  {
    name: "WhatsApp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    value: "+62 812-3456-7890",
    href: "https://wa.me/6289527718391",
    color: "#25D366",
  },
  // {
  //   name: "GitHub",
  //   icon: (
  //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
  //       <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  //     </svg>
  //   ),
  //   value: "@algifari",
  //   href: "https://github.com/algifari",
  //   color: "#333333",
  // },
  // {
  //   name: "LinkedIn",
  //   icon: (
  //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
  //       <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  //     </svg>
  //   ),
  //   value: "in/algifari",
  //   href: "https://linkedin.com/in/algifari",
  //   color: "#0A66C2",
  // },
  {
    name: "Instagram",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    value: "@thisjifaa._",
    href: "https://www.instagram.com/thisjifaa._/",
    color: "#E4405F",
  },
];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: "", email: "", project: "", message: "" });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Section id="contact" variant="soft" ref={sectionRef}>
      {/* Header */}
      <div className="text-center mb-12 animate-on-scroll">
        <span className="inline-block text-micro font-[family-name:var(--font-inter)] font-variation-settings:'wght' 600 text-[var(--color-primary)] uppercase tracking-wider mb-2">
          Kontak
        </span>
        <h2 className="text-display-xl font-[family-name:var(--font-inter)] text-[var(--color-ink)]">
          Tertarik?
        </h2>
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)] max-w-2xl mx-auto mt-4">
          Hubungi saya untuk diskusi project atau sekadar diskusi. Saya senang membantu!
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Left - Contact Info */}
        <div className="lg:col-span-2 space-y-6 animate-on-scroll">
          <Card variant="feature-light" className="bg-[var(--color-primary)] border-none">
            <div className="space-y-6">
              <h3 className="text-display-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-on-primary)]">
                Informasi Kontak
              </h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group"
                  >
                    <div
                      className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: `${link.color}20`, color: link.color }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-caption font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-on-dark-faint)]">
                        {link.name}
                      </p>
                      <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-on-primary)]">
                        {link.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Right - Contact Form */}
        <div className="lg:col-span-3 animate-on-scroll">
          <Card variant="feature-light">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-display-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-ink)] mb-2">
                  Pesan Terkirim!
                </h3>
                <p className="text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink-mute)]">
                  Terima kasih sudah menghubungi. Saya akan segera merespons secepat mungkin.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-display-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-ink)] mb-4">
                  Kirim Pesan
                </h3>

                {/* Name & Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-caption font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink)] mb-2">
                      Nama
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
                      placeholder="Nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-caption font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink)] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
                      placeholder="email@contoh.com"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="project" className="block text-caption font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink)] mb-2">
                    Jenis Project
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Pilih jenis project</option>
                    <option value="landing-page">Landing Page</option>
                    <option value="company-profile">Company Profile</option>
                    <option value="website-umkm">Website UMKM</option>
                    <option value="dashboard">Dashboard Admin</option>
                    <option value="web-app">Web Application</option>
                    <option value="custom">Custom Website</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="other">Lainnya</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-caption font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink)] mb-2">
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] bg-[var(--color-canvas)] border border-[var(--color-hairline)] text-[var(--color-ink)] text-body-md font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 focus:border-[var(--color-primary)] focus:outline-none transition-colors duration-200 resize-none"
                    placeholder="Ceritakan tentang project Anda..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary-dark"
                  size="lg"
                  className="w-full"
                  isLoading={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </Section>
  );
}
