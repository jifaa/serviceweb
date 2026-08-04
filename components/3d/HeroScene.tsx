"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";

interface HeroSceneProps {
  scrollProgress?: number;
}

export default function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* 
        Spline 3D Scene Container
        Cropping watermark:
        1. CSS selectors [&_a] and [&_a[href*="spline"]] hide DOM logo badges.
        2. Absolute inset scale (-inset-[4%] w-[108%] h-[108%]) and overflow-hidden crops any canvas-rendered watermark.
      */}
      <div
        className={`absolute -inset-[10%] w-[120%] h-[120%] transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } [&_a]:!hidden [&_a[href*="spline"]]:!hidden [&_img[src*="spline"]]:!hidden [&_canvas]:w-full [&_canvas]:h-full [&_canvas]:pointer-events-none pointer-events-none`}
        style={{
          transform: `scale(${1.18 - scrollProgress * 0.08}) translateY(${scrollProgress * 30}px)`,
          opacity: Math.max(0, 1 - scrollProgress * 1.4),
        }}
      >
        <Spline
          scene="https://prod.spline.design/seuu0A-mJ2tXeAyP/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Subtle spinner while 3D scene loads */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--color-surface-violet-soft)] border-t-transparent animate-spin opacity-50" />
        </div>
      )}

      {/* Atmospheric overlay to maintain text legibility */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-[var(--color-primary)] opacity-80" />
    </div>
  );
}
