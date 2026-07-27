"use client";

/**
 * anime.js v4 Hook for React
 *
 * Provides a custom hook and utilities for anime.js v4 integration
 * with React components, including scroll-triggered animations.
 */

import { useEffect, useRef, useState } from "react";
import { animate, set, createTimeline, stagger } from "animejs";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface UseAnimeOptions {
  trigger?: "load" | "hover" | "scroll" | "manual";
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Custom useAnime Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useAnime - Custom hook for anime.js animations
 *
 * @param targets - CSS selector string or DOM element ref
 * @param params - Anime.js animation parameters
 * @param options - Animation trigger options
 */
export function useAnime(
  targets: { current: Element | null } | string,
  params: Record<string, unknown>,
  options: UseAnimeOptions = {}
) {
  const { trigger = "load", threshold = 0.1, once = true } = options;
  const animeRef = useRef<ReturnType<typeof animate> | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasAnimated = useRef(false);
  const targetsRef = useRef(targets);

  // Keep targets ref updated
  useEffect(() => {
    targetsRef.current = targets;
  }, [targets]);

  // Create animation instance
  const createAnimation = () => {
    let el: Element | NodeListOf<Element> | null = null;
    const t = targetsRef.current;

    if (t && typeof t === "object" && "current" in t) {
      el = t.current;
    } else if (typeof t === "string") {
      el = document.querySelectorAll(t);
    }

    if (!el) return null;
    return animate(el, params as Parameters<typeof animate>[1]);
  };

  // Play animation
  const play = () => {
    if (animeRef.current) {
      animeRef.current.play();
    } else {
      animeRef.current = createAnimation();
      if (animeRef.current) {
        animeRef.current.play();
      }
    }
  };

  // Stop animation
  const stop = () => {
    if (animeRef.current) {
      animeRef.current.pause();
    }
  };

  // Run animation immediately
  const run = () => {
    animeRef.current = createAnimation();
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animeRef.current) {
        animeRef.current.pause();
        animeRef.current = null;
      }
    };
  }, []);

  // Handle trigger type
  useEffect(() => {
    if (trigger === "load") {
      const timer = setTimeout(run, 50);
      return () => clearTimeout(timer);
    }

    if (trigger === "manual") {
      return;
    }

    if (trigger === "hover") {
      let el: Element | null = null;
      const t = targetsRef.current;

      if (t && typeof t === "object" && "current" in t) {
        el = t.current;
      }

      if (!el) return;

      const handleMouseEnter = () => play();
      const handleMouseLeave = () => stop();

      if (el instanceof Element) {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        return () => {
          el?.removeEventListener("mouseenter", handleMouseEnter);
          el?.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }

    if (trigger === "scroll") {
      let el: Element | null = null;
      const t = targetsRef.current;

      if (t && typeof t === "object" && "current" in t) {
        el = t.current;
      }

      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
              if (once && hasAnimated.current) return;

              run();
              hasAnimated.current = true;

              if (once) {
                observer.disconnect();
              }
            } else if (!once) {
              animeRef.current?.seek(0);
            }
          });
        },
        { threshold }
      );

      observer.observe(el);

      return () => observer.disconnect();
    }
  }, [trigger, threshold, once]);

  return { play, stop, restart: run, run, isVisible };
}

// ─────────────────────────────────────────────────────────────────────────────
// Utility Functions
// ─────────────────────────────────────────────────────────────────────────────

export const animeEasings = {
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
  spring: "cubicBezier(0.175, 0.885, 0.32, 1.275)",
  bounce: "cubicBezier(0.68, -0.55, 0.265, 1.55)",
} as const;

// Re-export useful functions
export { animate, set, createTimeline, stagger };
