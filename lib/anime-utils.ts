/**
 * anime.js Utility - Additional utilities for anime.js v4
 *
 * This file provides helper functions and utilities
 * that work alongside the main anime.ts hook library.
 */

import * as anime from "animejs";

// ─────────────────────────────────────────────────────────────────────────────
// Common Animation Presets
// ─────────────────────────────────────────────────────────────────────────────

export const presets = {
  // Fade animations
  fadeIn: {
    opacity: [0, 1],
    duration: 600,
    ease: "easeOutExpo",
  },
  fadeOut: {
    opacity: [1, 0],
    duration: 400,
    ease: "easeInExpo",
  },

  // Slide animations
  slideUp: {
    opacity: [0, 1],
    translateY: [50, 0],
    duration: 600,
    ease: "easeOutExpo",
  },
  slideDown: {
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 600,
    ease: "easeOutExpo",
  },
  slideLeft: {
    opacity: [0, 1],
    translateX: [50, 0],
    duration: 600,
    ease: "easeOutExpo",
  },
  slideRight: {
    opacity: [0, 1],
    translateX: [-50, 0],
    duration: 600,
    ease: "easeOutExpo",
  },

  // Scale animations
  scaleIn: {
    opacity: [0, 1],
    scale: [0.5, 1],
    duration: 600,
    ease: "easeOutBack",
  },
  scaleInBounce: {
    opacity: [0, 1],
    scale: [0.3, 1.05, 0.95, 1],
    duration: 800,
    ease: "easeOutElastic(1, .5)",
  },
  scaleOut: {
    opacity: [1, 0],
    scale: [1, 0.5],
    duration: 400,
    ease: "easeInExpo",
  },

  // Rotate animations
  rotateIn: {
    opacity: [0, 1],
    rotate: [-180, 0],
    duration: 800,
    ease: "easeOutExpo",
  },

  // Blur animations
  blurIn: {
    opacity: [0, 1],
    filter: ["blur(20px)", "blur(0px)"],
    duration: 800,
    ease: "easeOutExpo",
  },

  // Zoom animations
  zoomIn: {
    opacity: [0, 1],
    scale: [0.5, 1],
    translateY: [20, 0],
    duration: 600,
    ease: "easeOutExpo",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Easing Functions
// ─────────────────────────────────────────────────────────────────────────────

export const easings = {
  linear: "linear",
  easeInQuad: "easeInQuad",
  easeInCubic: "easeInCubic",
  easeInQuart: "easeInQuart",
  easeInQuint: "easeInQuint",
  easeInSine: "easeInSine",
  easeInExpo: "easeInExpo",
  easeInCirc: "easeInCirc",
  easeInBack: "easeInBack",
  easeInElastic: "easeInElastic",
  easeOutQuad: "easeOutQuad",
  easeOutCubic: "easeOutCubic",
  easeOutQuart: "easeOutQuart",
  easeOutQuint: "easeOutQuint",
  easeOutSine: "easeOutSine",
  easeOutExpo: "easeOutExpo",
  easeOutCirc: "easeOutCirc",
  easeOutBack: "easeOutBack",
  easeOutElastic: "easeOutElastic",
  easeInOutQuad: "easeInOutQuad",
  easeInOutCubic: "easeInOutCubic",
  easeInOutQuart: "easeInOutQuart",
  easeInOutQuint: "easeInOutQuint",
  easeInOutSine: "easeInOutSine",
  easeInOutExpo: "easeInOutExpo",
  easeInOutCirc: "easeInOutCirc",
  easeInOutBack: "easeInOutBack",
  easeInOutElastic: "easeInOutElastic",
  // Spring easings
  spring: "cubicBezier(0.175, 0.885, 0.32, 1.275)",
  bounce: "cubicBezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Intersection Observer Helper
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Create an intersection observer for scroll-triggered animations
 */
export function createScrollObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
}

/**
 * Animate element when it scrolls into view
 */
export function animateOnScroll(
  targets: string | Element | NodeListOf<Element>,
  animation: Record<string, unknown>,
  options: {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
  } = {}
): { observer: IntersectionObserver } {
  const { threshold = 0.1, rootMargin = "0px", once = true } = options;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime.animate(targets, animation as Parameters<typeof anime.animate>[1]);

          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          anime.set(targets, animation as Parameters<typeof anime.set>[1]);
        }
      });
    },
    { threshold, rootMargin }
  );

  // Start observing
  if (typeof targets === "string") {
    const elements = document.querySelectorAll(targets);
    elements.forEach((el) => observer.observe(el));
  } else if (targets instanceof Element) {
    observer.observe(targets);
  } else {
    targets.forEach((el) => observer.observe(el));
  }

  return { observer };
}

// ─────────────────────────────────────────────────────────────────────────────
// Text Animation Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Split text into character spans
 */
export function splitTextToChars(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || "";
  const chars: HTMLElement[] = [];

  element.innerHTML = text
    .split("")
    .map((char) => {
      const span = document.createElement("span");
      span.className = "anime-char";
      span.textContent = char === " " ? " " : char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      chars.push(span);
      return span;
    })
    .join("");

  return chars;
}

/**
 * Split text into word spans
 */
export function splitTextToWords(element: HTMLElement): HTMLElement[] {
  const text = element.textContent || "";
  const words: HTMLElement[] = [];

  element.innerHTML = text
    .split(" ")
    .map((word) => {
      const span = document.createElement("span");
      span.className = "anime-word";
      span.textContent = word;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.marginRight = "0.25em";
      words.push(span);
      return span;
    })
    .join("");

  return words;
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Generate random value between min and max
 */
export function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffle array
 */
export function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// ─────────────────────────────────────────────────────────────────────────────
// Export anime.js core
// ─────────────────────────────────────────────────────────────────────────────

export { anime };
