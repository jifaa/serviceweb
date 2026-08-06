import { ReactNode, CSSProperties, forwardRef, HTMLAttributes, useMemo } from "react";
import { useTilt3D, TiltOptions } from "@/lib/use3DTilt";

type CardVariant = "neu" | "neu-inset";

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
  "neu": `
    neu
    p-[var(--spacing-xl)]
  `,
  "neu-inset": `
    neu-inset
    p-[var(--spacing-xl)]
  `,
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = "neu", className = "", style, tilt3d = false, tiltOptions, ...props }, ref) => {
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

