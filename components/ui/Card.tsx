import { ReactNode, CSSProperties } from "react";

type CardVariant = "feature-light" | "feature-row" | "pricing" | "pricing-featured";

interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  className?: string;
  style?: CSSProperties;
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

export function Card({ children, variant = "feature-light", className = "", style }: CardProps) {
  return (
    <div className={`${variantStyles[variant]} ${className}`} style={style}>
      {children}
    </div>
  );
}
