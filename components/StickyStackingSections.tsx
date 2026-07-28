"use client";

import React, { useRef, ReactNode, Children, isValidElement } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * STICKY STACKING SECTIONS
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * A premium scroll-driven stacking effect using CSS `position: sticky`.
 * Each card pins at `top: 0` as a sibling element. When the user scrolls,
 * the next card rises from below and overlaps the current one — like a
 * deck of cards being flipped.
 *
 * As a card gets covered, it progressively:
 *   • Scales down (1 → 0.95)
 *   • Blurs (0px → 12px)
 *   • Dims brightness (1 → 0.6)
 *   • Fades opacity (1 → 0.4)
 *   • Drifts upward (-20px)
 *
 * All transforms are GPU-accelerated via Framer Motion for 60fps performance.
 *
 * Architecture:
 * ─────────────────────────────────────────────────────────────────────────────
 *   Container (relative, height = N × 100vh)
 *     ├── Card 0  (sticky top:0, z-index:1)  ← animated on exit
 *     ├── Card 1  (sticky top:0, z-index:2)  ← animated on exit
 *     ├── Card 2  (sticky top:0, z-index:3)  ← animated on exit
 *     └── Card N  (sticky top:0, z-index:N+1) ← no exit animation
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * Usage:
 * ─────────────────────────────────────────────────────────────────────────────
 * <StickyStackingSections>
 *   <StackingCard>
 *     <StackingContent>
 *       <YourContent />
 *     </StackingContent>
 *   </StackingCard>
 *   <StackingCard bgColor="#f5f5f5">
 *     <StackingContent>
 *       <YourContent />
 *     </StackingContent>
 *   </StackingCard>
 * </StickyStackingSections>
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────────────────────────────────────
// Types & Interfaces
// ─────────────────────────────────────────────────────────────────────────────

interface StickyStackingSectionsProps {
  children: ReactNode;
  className?: string;
  /** Maximum blur radius in pixels. Default: 12 */
  maxBlur?: number;
  /** Minimum opacity when fully covered. Default: 0.4 */
  minOpacity?: number;
  /** Scale factor when fully covered. Default: 0.95 */
  endScale?: number;
  /** Minimum brightness when fully covered. Default: 0.6 */
  minBrightness?: number;
  /** Y translation in px when card is fully covered. Default: -20 */
  translateY?: number;
}

interface StackingCardProps {
  children: ReactNode;
  className?: string;
  /** Card background color. Default: "var(--color-canvas)" */
  bgColor?: string;
  /** Card border radius. Default: "24px" */
  borderRadius?: string;
  /** Shadow intensity (0-1). Default: 0.12 */
  shadowIntensity?: number;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Internal: Animated Sticky Card
// ─────────────────────────────────────────────────────────────────────────────

interface StickyCardInternalProps {
  children: ReactNode;
  index: number;
  totalCards: number;
  maxBlur: number;
  minOpacity: number;
  endScale: number;
  minBrightness: number;
  translateY: number;
  isLast: boolean;
  className?: string;
  bgColor: string;
  borderRadius: string;
  shadowIntensity: number;
}

function StickyCardInternal({
  children,
  index,
  totalCards,
  maxBlur,
  minOpacity,
  endScale,
  minBrightness,
  translateY,
  isLast,
  className = "",
  bgColor,
  borderRadius,
  shadowIntensity,
}: StickyCardInternalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number | null>(null);

  // Track this card's scroll progress within the viewport.
  // "start start" = card top hits viewport top (card is fully in view / pinned)
  // "end start"   = card bottom hits viewport top (card is fully scrolled past)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // ───────────────────────────────────────────────────────────────────────────
  // Motion values — only animate non-last cards
  // The last card stays fully visible with no exit animation.
  // ───────────────────────────────────────────────────────────────────────────

  // Start animating at 70% scroll progress (card stays crisp until next card overlaps)
  const animStart = 0.7;

  const scale = useTransform(
    scrollYProgress,
    [animStart, 1],
    isLast ? [1, 1] : [1, endScale]
  );

  const opacity = useTransform(
    scrollYProgress,
    [animStart, 1],
    isLast ? [1, 1] : [1, minOpacity]
  );

  const blur = useTransform(
    scrollYProgress,
    [animStart, 1],
    isLast ? [0, 0] : [0, maxBlur]
  );

  const brightness = useTransform(
    scrollYProgress,
    [animStart, 1],
    isLast ? [1, 1] : [1, minBrightness]
  );

  const y = useTransform(
    scrollYProgress,
    [animStart, 1],
    isLast ? [0, 0] : [0, translateY]
  );

  // Combine blur + brightness into a single filter string (one paint pass)
  const filter = useTransform(
    [blur, brightness],
    ([blurVal, brightnessVal]) =>
      `blur(${blurVal}px) brightness(${brightnessVal})`
  );

  // Z-index: later cards stack on top (index + 1 so first card = z-1, last = z-N)
  const zIndex = index + 1;

  // Intercept wheel scroll: scroll internal content to bottom first before passing scroll to window
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = surfaceRef.current;
    if (!el) return;

    const maxScrollTop = el.scrollHeight - el.clientHeight;
    if (maxScrollTop <= 4) return;

    const isAtBottom = el.scrollTop >= maxScrollTop - 4;
    const isAtTop = el.scrollTop <= 4;

    if (e.deltaY > 0 && !isAtBottom) {
      el.scrollTop += e.deltaY;
      e.stopPropagation();
    } else if (e.deltaY < 0 && !isAtTop) {
      el.scrollTop += e.deltaY;
      e.stopPropagation();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const el = surfaceRef.current;
    if (!el || touchStartY.current === null) return;

    const maxScrollTop = el.scrollHeight - el.clientHeight;
    if (maxScrollTop <= 4) return;

    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;

    const isAtBottom = el.scrollTop >= maxScrollTop - 4;
    const isAtTop = el.scrollTop <= 4;

    if (deltaY > 0 && !isAtBottom) {
      el.scrollTop += deltaY;
      touchStartY.current = currentY;
      e.stopPropagation();
    } else if (deltaY < 0 && !isAtTop) {
      el.scrollTop += deltaY;
      touchStartY.current = currentY;
      e.stopPropagation();
    }
  };

  return (
    <div
      ref={cardRef}
      className="sticky-stacking-card"
      style={{
        position: "sticky",
        top: 0,
        zIndex,
        height: "100vh",
        width: "100%",
      }}
    >
      <motion.div
        className={`sticky-stacking-card__inner ${className}`}
        style={{
          scale,
          opacity,
          y,
          filter,
          width: "100%",
          height: "100%",
          willChange: "transform, filter",
          transformOrigin: "center top",
          // GPU layer promotion
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {/* Visual card surface */}
        <div
          ref={surfaceRef}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="sticky-stacking-card__surface overflow-y-auto overflow-x-hidden"
          style={{
            width: "100%",
            height: "100%",
            overflowY: "auto",
            overflowX: "hidden",
            backgroundColor: bgColor,
            borderRadius,
            boxShadow: `0 ${2 + shadowIntensity * 30}px ${
              12 + shadowIntensity * 48
            }px rgba(0, 0, 0, ${shadowIntensity}),
                         0 ${1 + shadowIntensity * 4}px ${
              4 + shadowIntensity * 8
            }px rgba(0, 0, 0, ${shadowIntensity * 0.5})`,
          }}
        >
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Container Component
// ─────────────────────────────────────────────────────────────────────────────

/**
 * StickyStackingSections
 *
 * Wraps StackingCard children in a scroll container that creates the
 * sticky card-stacking effect. Each child pins at `top: 0` and incoming
 * cards wipe over previous ones.
 *
 * The container's height = numberOfCards × 100vh, providing the scroll
 * runway needed for each card to have its own viewport-height of scroll
 * travel.
 */
export function StickyStackingSections({
  children,
  className = "",
  maxBlur = 12,
  minOpacity = 0.4,
  endScale = 0.95,
  minBrightness = 0.6,
  translateY = -20,
}: StickyStackingSectionsProps) {
  // Filter to valid React elements only
  const validChildren = Children.toArray(children).filter(
    (child): child is React.ReactElement => isValidElement(child)
  );

  const totalCards = validChildren.length;

  // Total height = N × 100vh — each card occupies one viewport of scroll
  const totalHeight = `${totalCards * 100}vh`;

  return (
    <div
      className={`sticky-stacking-container ${className}`}
      style={{
        position: "relative",
        width: "100%",
        height: totalHeight,
      }}
      aria-label="Sticky stacking sections"
    >
      {validChildren.map((child, index) => {
        // Extract props from the StackingCard wrapper
        const childProps = child.props as StackingCardProps;
        const isLast = index === totalCards - 1;

        return (
          <StickyCardInternal
            key={index}
            index={index}
            totalCards={totalCards}
            maxBlur={maxBlur}
            minOpacity={minOpacity}
            endScale={endScale}
            minBrightness={minBrightness}
            translateY={translateY}
            isLast={isLast}
            className={childProps.className}
            bgColor={childProps.bgColor ?? "var(--color-canvas)"}
            borderRadius={childProps.borderRadius ?? "24px"}
            shadowIntensity={childProps.shadowIntensity ?? 0.12}
          >
            {childProps.children}
          </StickyCardInternal>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: StackingCard (wrapper / props carrier)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * StackingCard
 *
 * A declarative wrapper for each section inside StickyStackingSections.
 * Its props (bgColor, borderRadius, shadowIntensity) are read by the
 * parent container to configure the internal StickyCardInternal.
 *
 * This component itself is a simple passthrough — the actual sticky
 * behavior and animation is handled by StickyCardInternal.
 */
export function StackingCard({
  children,
  className,
  bgColor,
  borderRadius,
  shadowIntensity,
}: StackingCardProps) {
  // Passthrough — props are read by StickyStackingSections via child.props
  return <>{children}</>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Public: StackingContent (layout helper)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * StackingContent
 *
 * Optional wrapper for card content. Provides consistent centering,
 * padding, and flex layout within a stacked card.
 */
export function StackingContent({ children, className = "" }: CardContentProps) {
  return (
    <div
      className={`sticky-stacking-content ${className}`}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        padding: "clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 4rem)",
      }}
    >
      {children}
    </div>
  );
}
