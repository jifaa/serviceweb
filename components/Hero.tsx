"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useReducedMotion, useMotionValueEvent } from "motion/react";
import { Button } from "./ui/Button";
import RotatingText from "./RotatingText";
import { Spotlight } from "./ui/spotlight";
import { SplineScene } from "./ui/spline";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const [scrollProgress, setScrollProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Apply spring physics for silky-smooth zoom and blur transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  // Subscribe to smooth scroll progress
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollProgress(latest);
  });

  const filter = useTransform(smoothProgress, [0, 0.7], ["blur(0px)", "blur(14px)"]);
  const opacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(smoothProgress, [0, 0.8], [1, 1.28]);

  // Disable on prefers-reduced-motion
  const filterVal = prefersReduced ? "blur(0px)" : filter;
  const opacityVal = prefersReduced ? 1 : opacity;
  const scaleVal = prefersReduced ? 1 : scale;

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center bg-[var(--neu-bg)] overflow-hidden"
    >
      {/* Soft gradient background - neumorphic friendly */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--neu-accent) 15%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, color-mix(in srgb, var(--neu-accent) 10%, transparent) 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Spotlight Effect */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />

      {/* Main Content with Robot */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-6 w-full h-full flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 w-full h-full pt-20 pb-0">
          {/* Left Content - Text */}
          <motion.div
            style={{ filter: filterVal, opacity: opacityVal, scale: scaleVal }}
            className="flex-none lg:flex-1 w-full lg:w-auto"
          >
            <div className="space-y-4 animate-fade-in-up text-center lg:text-left flex flex-col items-center lg:items-start">

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[var(--neu-foreground)] leading-tight tracking-tight flex flex-col items-center lg:items-start gap-2 max-w-full [&>span]:font-black [&>span]:tracking-tight [&>span]:leading-tight" style={{ fontVariationSettings: "'wght' 900" }}>
                {/* Baris 1 */}
                <span className="block max-w-full">Membantu Mewujudkan</span>

                {/* Baris 2 */}
                <span className="inline-flex max-w-full items-center justify-center lg:justify-start gap-2">
                  <RotatingText
                    texts={["Website & Aplikasi", "Landing Page", "Sistem Informasi", "Portofolio Digital"]}
                    mainClassName="px-3 py-1.5 sm:px-4 sm:py-2 neu-inset text-[var(--neu-foreground)] justify-center rounded-lg sm:rounded-xl inline-flex text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight"
                    staggerFrom={"first"}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-120%" }}
                    staggerDuration={0.05}
                    splitLevelClassName="overflow-hidden"
                    transition={{ type: "spring", damping: 30, stiffness: 400 }}
                    rotationInterval={3000}
                    style={{ fontVariationSettings: "'wght' 900" }}
                  />
                </span>

                {/* Baris 3 */}
                <span className="block max-w-full">Sesuai Kebutuhan Anda</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-[var(--neu-foreground)] max-w-xl text-center lg:text-left leading-relaxed opacity-80">
                Siap membantu Anda dalam membuat website dan aplikasi sesuai kebutuhan dengan harga ramah dan komunikasi terbuka.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                <Button
                  variant="neu-accent"
                  size="lg"
                  className="!text-[var(--neu-foreground)]"
                  onClick={() => {
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Diskusi Gratis
                </Button>
                <Button
                  variant="neu"
                  size="lg"
                  onClick={() => {
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Lihat Portfolio
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Spline 3D Robot */}
          <motion.div
            style={{ filter: filterVal, opacity: opacityVal, scale: scaleVal }}
            className="flex-1 w-full lg:h-[calc(100vh-5rem)] min-h-[400px] sm:min-h-[500px] lg:min-h-0 relative"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
