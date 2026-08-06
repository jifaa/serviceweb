"use client";

import { useEffect, useRef, useState, type FormEvent, useCallback } from "react";
import { animate, set } from "animejs";
import { Section } from "./ui/Section";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";

const contactInfo = [
  {
    name: "Email",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    value: "akhmad.abid.345@gmail.com",
    href: "mailto:akhmad.abid.345@gmail.com",
    color: "#5b7cfa",
  },
  {
    name: "WhatsApp",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    value: "+62 895-2771-8391",
    href: "https://wa.me/6289527718391",
    color: "#5b7cfa",
  },
  {
    name: "Instagram",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    value: "@thisjifaa._",
    href: "https://www.instagram.com/thisjifaa._/",
    color: "#5b7cfa",
  },
];

interface FormData {
  name: string;
  email: string;
  project: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function ContactItem({ link, index }: { link: typeof contactInfo[0]; index: number }) {
  const itemRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    set(item, { opacity: 0, translateX: -20 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(item, {
              opacity: [0, 1],
              translateX: [-20, 0],
              duration: 400,
              delay: index * 100,
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
    <a
      ref={itemRef}
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group py-3 px-4 neu-sm hover:text-[var(--neu-accent)] transition-all duration-200"
    >
      <div
        className="neu w-14 h-14 rounded-[var(--radius-lg)] flex items-center justify-center transition-transform duration-200 group-hover:scale-110 flex-shrink-0 text-[var(--neu-accent)]"
      >
        {link.icon}
      </div>
      <div className="min-w-0">
        <p className="text-micro text-[var(--neu-foreground-muted)] uppercase tracking-wider">
          {link.name}
        </p>
        <p className="text-body-md text-[var(--neu-foreground)] truncate">
          {link.value}
        </p>
      </div>
    </a>
  );
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prevSubmitting = useRef(isSubmitting);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    if (isSubmitting && !prevSubmitting.current) {
      animate(button, {
        scale: [1, 0.95, 1],
        duration: 200,
        easing: "easeOutQuart",
      });
    }

    prevSubmitting.current = isSubmitting;
  }, [isSubmitting]);

  return (
    <Button
      ref={buttonRef as any}
      type="submit"
      variant="neu-accent"
      size="lg"
      isLoading={isSubmitting}
      className="w-full submit-button text-black"
    >
      {!isSubmitting && (
        <>
          <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="text-black font-semibold">Kirim via WhatsApp</span>
        </>
      )}
    </Button>
  );
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const header = headerRef.current;
    const infoCard = infoCardRef.current;
    const formCard = formCardRef.current;
    if (!header || !infoCard || !formCard) return;

    set(header, { opacity: 0, translateY: 30 });
    set(infoCard, { opacity: 0, translateX: -30 });
    set(formCard, { opacity: 0, translateX: 30 });

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
            animate(infoCard, {
              opacity: [0, 1],
              translateX: [-30, 0],
              filter: ["blur(10px)", "blur(0px)"],
              duration: 600,
              delay: 200,
              easing: "easeOutQuart",
            });
            animate(formCard, {
              opacity: [0, 1],
              translateX: [30, 0],
              duration: 600,
              delay: 300,
              easing: "easeOutQuart",
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (submitStatus === "success" && successRef.current) {
      const success = successRef.current;
      const svg = success.querySelector("svg");

      set(success, { opacity: 0, scale: 0.8, translateY: 10 });

      animate(success, {
        opacity: [0, 1],
        scale: [0.8, 1],
        translateY: [10, 0],
        duration: 400,
        easing: "easeOutBack",
      });

      if (svg) {
        animate(svg, {
          rotate: [0, 360],
          duration: 500,
          delay: 200,
          easing: "easeOutQuart",
        });
      }
    }
  }, [submitStatus]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama diperlukan";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email diperlukan";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Pesan diperlukan";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Pesan minimal 10 karakter";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Open WhatsApp with pre-filled message
    const waMessage = encodeURIComponent(
      `Halo, saya ${formData.name}!\n\nEmail: ${formData.email}\nProject: ${formData.project || "Belum disebutkan"}\n\n${formData.message}`
    );
    const waUrl = `https://wa.me/6289527718391?text=${waMessage}`;

    window.open(waUrl, "_blank");

    setIsSubmitting(false);
    setSubmitStatus("success");

    // Reset form after success
    setTimeout(() => {
      setFormData({ name: "", email: "", project: "", message: "" });
      setSubmitStatus("idle");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <Section id="contact" variant="dark" ref={sectionRef}>
      {/* Header */}
      <div ref={headerRef} className="text-center mb-16">
        <h2 className="text-display-xl text-[var(--neu-foreground)] mb-4">
          Mari Diskusi
        </h2>
        <p className="text-body-lg text-[var(--neu-foreground)] opacity-80 max-w-xl mx-auto">
          Punya ide project atau pertanyaan? Hubungi saya ,saya senang membantu mewujudkan ide Anda.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left - Contact Info */}
        <div ref={infoCardRef} className="w-full">
          <Card variant="neu" className="p-10 sm:p-12" tilt3d={true}>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-display-md text-[var(--neu-foreground)]">
                  Informasi Kontak
                </h3>
                <p className="text-body-md text-[var(--neu-foreground)] opacity-70">
                  Pilih cara terbaik untuk menghubungi saya
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((link, index) => (
                  <ContactItem key={index} link={link} index={index} />
                ))}
              </div>

              <div>
                <hr className="neu-divider mb-6" />
                <p className="text-body-md text-[var(--neu-foreground)] opacity-70">
                  Respon biasanya dalam 1x24 jam. Untuk project urgent, WhatsApp adalah pilihan tercepat.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right - Contact Form */}
        <div ref={formCardRef}>
          <Card variant="neu" className="p-8" tilt3d={true}>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-display-md text-[var(--neu-foreground)]">
                  Kirim Pesan
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-3">
                  <label htmlFor="name" className="block text-body-md text-[var(--neu-foreground)] font-medium">
                    Nama <span className="text-[var(--neu-accent)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama lengkap Anda"
                    className={`
                      w-full px-5 py-4 rounded-[var(--radius-lg)]
                      neu-inset
                      text-[var(--neu-foreground)]
                      text-body-md
                      transition-all duration-200
                      placeholder:text-[var(--neu-foreground)]
                      placeholder:opacity-50
                      focus:outline-none focus:ring-2 focus:ring-[var(--neu-accent)]
                      ${errors.name ? "ring-2 ring-[var(--neu-accent)]" : ""}
                    `}
                  />
                  {errors.name && (
                    <p className="text-body-md text-[var(--neu-accent)]">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-3">
                  <label htmlFor="email" className="block text-body-md text-[var(--neu-foreground)] font-medium">
                    Email <span className="text-[var(--neu-accent)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@contoh.com"
                    className={`
                      w-full px-5 py-4 rounded-[var(--radius-lg)]
                      neu-inset
                      text-[var(--neu-foreground)]
                      text-body-md
                      transition-all duration-200
                      placeholder:text-[var(--neu-foreground)]
                      placeholder:opacity-50
                      focus:outline-none focus:ring-2 focus:ring-[var(--neu-accent)]
                      ${errors.email ? "ring-2 ring-[var(--neu-accent)]" : ""}
                    `}
                  />
                  {errors.email && (
                    <p className="text-body-md text-[var(--neu-accent)]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Project Type Field - Single Neumorphic Expandable */}
                <div className="space-y-3">
                  <label className="block text-body-md text-[var(--neu-foreground)] font-medium">
                    Jenis Project
                  </label>

                  {/* Single Neumorphic Container - memanjang saat expand */}
                  <div
                    className={`
                      neu-inset
                      rounded-[var(--radius-lg)]
                      overflow-hidden
                      transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                      ${isDropdownOpen ? 'rounded-b-none' : ''}
                    `}
                  >
                    {/* Header - Selected Value */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left"
                    >
                      <span className={`text-body-md ${formData.project ? 'text-[var(--neu-foreground)]' : 'text-[var(--neu-foreground)] opacity-50'}`}>
                        {formData.project
                          ? formData.project.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
                          : 'Pilih jenis project (opsional)'}
                      </span>
                      <svg
                        className={`w-4 h-4 text-[var(--neu-foreground-muted)] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Options - memanjang dari dalam neu-inset */}
                    <div
                      className={`
                        transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                        ${isDropdownOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                      `}
                    >
                      {/* Divider */}
                      <div className="h-px bg-[var(--neu-bg-dark)] mx-4"></div>

                      {/* Options List */}
                      <div className="py-2">

                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'landing-page' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'landing-page' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Landing Page
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'company-profile' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'company-profile' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Company Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'website-umkm' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'website-umkm' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Website UMKM
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'dashboard' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'dashboard' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Dashboard Admin
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'web-app' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'web-app' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Web Application
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'custom' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'custom' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Custom Website
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, project: 'other' }));
                            setIsDropdownOpen(false);
                          }}
                          className={`
                            w-full px-5 py-3 text-left text-body-md
                            transition-colors duration-150
                            hover:bg-[var(--neu-bg-dark)]
                            ${formData.project === 'other' ? 'text-[var(--neu-accent)] font-medium' : 'text-[var(--neu-foreground)]'}
                          `}
                        >
                          Lainnya
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-3">
                  <label htmlFor="message" className="block text-body-md text-[var(--neu-foreground)] font-medium">
                    Pesan <span className="text-[var(--neu-accent)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Ceritakan project atau ide Anda..."
                    rows={4}
                    className={`
                      w-full px-5 py-4 rounded-[var(--radius-lg)]
                      neu-inset
                      text-[var(--neu-foreground)]
                      text-body-md
                      transition-all duration-200 resize-none
                      placeholder:text-[var(--neu-foreground)]
                      placeholder:opacity-50
                      focus:outline-none focus:ring-2 focus:ring-[var(--neu-accent)]
                      ${errors.message ? "ring-2 ring-[var(--neu-accent)]" : ""}
                    `}
                  />
                  {errors.message && (
                    <p className="text-body-md text-[var(--neu-accent)]">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <SubmitButton isSubmitting={isSubmitting} />

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div ref={successRef} className="p-5 rounded-[var(--radius-lg)] neu text-center text-[var(--neu-accent)]">
                    <p className="text-body-md flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Pesan terkirim! Mengalihkan ke WhatsApp...
                    </p>
                  </div>
                )}
              </form>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
}
