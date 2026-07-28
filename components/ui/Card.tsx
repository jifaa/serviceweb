import { ReactNode, CSSProperties, forwardRef, HTMLAttributes, useMemo } from "react";
import { useTilt3D, TiltOptions } from "@/lib/use3DTilt";

type CardVariant = "feature-light" | "feature-row" | "pricing" | "pricing-featured";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  style?: CSSProperties;
  /** Enable 3D tilt effect on hover (default: false) */
  tilt3d?: boolean;
  /** Options for the tilt effect */
  tiltOptions?: TiltOptions;
}

const variantStyles: Record<CardVariant, string> = {
  "feature-light": `
    bg-[var(--color-canvas)]
    border border-[var(--color-hairline)]
    rounded-[var(--radius-lg)]
    p-[var(--spacing-xxl)]
  `,
  "feature-row": `
    bg-[var(--color-canvas-soft)]
    rounded-[var(--radius-md)]
    p-[var(--spacing-xl)]
  `,
  "pricing": `
    bg-[var(--color-canvas)]
    border border-[var(--color-hairline)]
    rounded-[var(--radius-lg)]
    p-[var(--spacing-xxl)]
  `,
  "pricing-featured": `
    bg-[var(--color-primary)]
    text-[var(--color-on-primary)]
    rounded-[var(--radius-lg)]
    p-[var(--spacing-xxl)]
  `,
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "feature-light", className = "", style, tilt3d = false, tiltOptions, ...props }, ref) => {
    // Use tilt effect if enabled
    const tilt = useTilt3D<HTMLDivElement>({
      max: 8,
      scale: 1.03,
      perspective: 1000,
      speed: 0.15,
      resetSpeed: 0.4,
      ...tiltOptions,
    });

    // Merge refs - use external ref if provided, otherwise internal tilt ref
    const combinedRef = useMemo(() => {
      if (ref) {
        // Both refs provided - attach to both
        if (typeof ref === "function") {
          return (node: HTMLDivElement | null) => {
            ref(node);
            (tilt.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          };
        }
        return (node: HTMLDivElement | null) => {
          (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          (tilt.ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        };
      }
      return tilt.ref;
    }, [ref, tilt.ref]);

    // Apply tilt styles and handlers when enabled
    const combinedStyle = tilt3d ? { ...style, ...tilt.tiltStyle } : style;
    const tiltEventHandlers = tilt3d ? tilt.eventHandlers : {};

    return (
      <div
        ref={combinedRef}
        className={`${variantStyles[variant]} ${className}`}
        style={combinedStyle}
        {...tiltEventHandlers}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

