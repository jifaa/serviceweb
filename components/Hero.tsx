"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from "motion/react";
import { Button } from "./ui/Button";
import RotatingText from "./RotatingText";
import LightRays from "./LightRays";

// Dynamic import for 3D scene (no SSR, WebGL only)
const Hero3DScene = dynamic(() => import("./Hero3DScene"), {
  ssr: false,
  loading: () => null,
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subscribe to scroll progress for 3D scene
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const filter = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 2]);

  // Disable on prefers-reduced-motion
  const filterVal = prefersReduced ? "blur(0px)" : filter;
  const opacityVal = prefersReduced ? 1 : opacity;
  const scaleVal = prefersReduced ? 1 : scale;

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center bg-[var(--color-primary)] overflow-hidden"
    >
      {/* Atmospheric Backdrop with LightRays */}
      <div className="absolute inset-0">
        {/* Dark gradient base */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, var(--color-primary-deep) 0%, var(--color-primary) 100%)",
          }}
        />
        {/* LightRays effect */}
        <LightRays
          raysOrigin="top-center"
          raysColor="#c9b4fa"
          raysSpeed={0.8}
          lightSpread={1.2}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.02}
          className="absolute inset-0"
        />

        {/* 3D WebGL Scene - floating geometric shapes */}
        <Hero3DScene scrollYProgress={scrollProgress} />
      </div>

      {/* Content */}
      <motion.div
        style={{ filter: filterVal, opacity: opacityVal, scale: scaleVal }}
        className="relative z-10 max-w-[1100px] mx-auto px-4 md:px-8 pt-24 pb-16"
      >
        <div className="flex justify-center items-center">
          {/* Text Content - Centered */}
          <div className="space-y-8 animate-fade-in-up text-center flex flex-col items-center ">


            {/* Headline */}
            <h1 className="text-display-xl font-['Arial_Black',sans-serif] text-[var(--color-on-primary)] text-center leading-tight">
              {/* Baris 1: selalu satu baris */}
              <span className="inline-flex flex-nowrap whitespace-nowrap items-center justify-center gap-2 flex-wrap-0">
                <span>Membantu Mewujudkan</span>
                <RotatingText
                  texts={["Website & Aplikasi", "Landing Page", "Sistem Informasi", "Portofolio Digital"]}
                  mainClassName="px-6 py-3 bg-[var(--color-surface-violet-soft)] text-[var(--color-primary)] justify-center rounded-xl inline-flex shadow-lg"
                  staggerFrom={"first"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.05}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </span>
              <br />
              <span>Sesuai Kebutuhan Anda</span>
            </h1>

            {/* Subheadline */}
            <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-on-dark-mute)] max-w-xl mx-auto text-center">
              Siap membantu anda dalam membuat website dan aplikasi sederhana sesuai kebutuhan anda dengan harga ramah dan komunikasi terbuka.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="on-dark-pill"
                size="lg"
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Diskusi Gratis
              </Button>
              <Button
                variant="secondary-outline"
                size="lg"
                className="!border-[var(--color-hairline-dark)] !text-[var(--color-on-black)] hover:!bg-[var(--color-on-primary)]/10 hover:!text-[var(--color-on-primary)]"
                onClick={() => {
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Lihat Portfolio
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
