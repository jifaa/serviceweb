"use client";

import { useRef, useEffect, RefObject, useCallback, MutableRefObject } from "react";

export interface TiltOptions {
  /** Maximum rotation in degrees (default: 8) */
  max?: number;
  /** Scale on hover (default: 1.02) */
  scale?: number;
  /** Perspective in pixels (default: 1000) */
  perspective?: number;
  /** Transition speed for mouse movement (default: 0.15) */
  speed?: number;
  /** Transition speed for reset (default: 0.4) */
  resetSpeed?: number;
  /** Enable glare effect (default: false) */
  glare?: boolean;
  /** Maximum glare opacity (default: 0.3) */
  maxGlare?: number;
  /** Optional external ref to use (for anime.js compatibility) */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  externalRef?: MutableRefObject<any>;
}

export interface UseTilt3DResult<T extends HTMLElement = HTMLDivElement> {
  /** Ref to attach to the element */
  ref: RefObject<T | null>;
  /** CSS styles to apply to the element */
  tiltStyle: React.CSSProperties;
  /** Event handlers to spread onto the element */
  eventHandlers: {
    onMouseMove: (e: React.MouseEvent<T>) => void;
    onMouseLeave: (e: React.MouseEvent<T>) => void;
    onMouseEnter: (e: React.MouseEvent<T>) => void;
  };
}

/** eslint-disable @typescript-eslint/no-explicit-any */
type AnyRef = MutableRefObject<any>;

/**
 * A reusable 3D tilt effect hook that responds to mouse movement.
 *
 * Features:
 * - Smooth rotation based on cursor position
 * - Scale effect on hover
 * - Respects prefers-reduced-motion
 * - Disabled on touch devices (checks for fine pointer)
 * - Direct DOM manipulation via ref (no re-renders on mousemove)
 */
export function useTilt3D<T extends HTMLElement = HTMLDivElement>(
  options: TiltOptions = {}
): UseTilt3DResult<T> {
  const {
    max = 8,
    scale = 1.02,
    perspective = 1000,
    speed = 0.15,
    resetSpeed = 0.4,
    glare = false,
    maxGlare = 0.3,
    externalRef,
  } = options;

  const internalRef = useRef<T>(null);

  // Use external ref if provided, otherwise use internal ref
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref: MutableRefObject<any> = externalRef || internalRef;

  const state = useRef({
    isEnabled: false,
    glareElement: null as HTMLElement | null,
  });

  // Check device capabilities on mount
  useEffect(() => {
    const isFinePointer =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    state.current.isEnabled = isFinePointer && !prefersReducedMotion;

    // Create glare element if needed
    if (glare && ref.current && state.current.isEnabled) {
      const glareEl = document.createElement("div");
      glareEl.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        opacity: 0;
        background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,${maxGlare}) 45%, rgba(255,255,255,${maxGlare * 0.5}) 50%, transparent 55%);
        transition: opacity 0.3s ease;
        will-change: transform, opacity;
      `;
      ref.current.style.position = "relative";
      ref.current.appendChild(glareEl);
      state.current.glareElement = glareEl;
    }

    return () => {
      // Cleanup glare element - capture reference at cleanup time
      const glareEl = state.current.glareElement;
      if (glareEl) {
        glareEl.remove();
        state.current.glareElement = null;
      }
    };
  }, [glare, maxGlare, ref]);

  // Calculate tilt transform
  const calculateTilt = useCallback(
    (element: T, clientX: number, clientY: number, updateGlare = false) => {
      if (!state.current.isEnabled) return;

      const rect = element.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation angles
      const rotateX = ((y - centerY) / centerY) * -max;
      const rotateY = ((x - centerX) / centerX) * max;

      // Apply transform directly to DOM
      element.style.transition = `transform ${speed}s ease-out`;
      element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, 1)`;

      // Update glare if enabled
      if (glare && state.current.glareElement && updateGlare) {
        const percentX = ((x - rect.left) / rect.width) * 100;
        const percentY = ((y - rect.top) / rect.height) * 100;

        state.current.glareElement.style.opacity = "1";
        state.current.glareElement.style.transform = `rotateZ(45deg) translate(${percentX - 50}%, ${percentY - 50}%)`;
      }
    },
    [max, scale, perspective, speed, glare]
  );

  // Reset to default state
  const resetTilt = useCallback((element: T) => {
    element.style.transition = `transform ${resetSpeed}s ease-out`;
    element.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (glare && state.current.glareElement) {
      state.current.glareElement.style.opacity = "0";
    }
  }, [resetSpeed, glare]);

  // Event handlers
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const element = ref.current;
      if (element) {
        calculateTilt(element, e.clientX, e.clientY, true);
      }
    },
    [calculateTilt, ref]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<T>) => {
      const element = ref.current;
      if (element) {
        resetTilt(element);
      }
    },
    [resetTilt, ref]
  );

  const handleMouseEnter = useCallback(
    (_e: React.MouseEvent<T>) => {
      // No need to set initial state on enter, mousemove will trigger first
    },
    []
  );

  // Base styles for the tilt element
  const tiltStyle: React.CSSProperties = {
    transformStyle: "preserve-3d" as const,
    willChange: "transform",
    backfaceVisibility: "hidden" as const,
  };

  return {
    ref,
    tiltStyle,
    eventHandlers: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
      onMouseEnter: handleMouseEnter,
    },
  };
}

export default useTilt3D;
