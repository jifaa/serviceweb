"use client";

import { ReactNode, forwardRef } from "react";

type SectionVariant = "dark" | "light" | "soft";

interface SectionProps {
  children: ReactNode;
  variant?: SectionVariant;
  className?: string;
  id?: string;
}

const variantStyles: Record<SectionVariant, string> = {
  dark: `
    bg-[var(--color-primary)]
    text-[var(--color-on-primary)]
  `,
  light: `
    bg-[var(--color-canvas)]
    text-[var(--color-ink)]
  `,
  soft: `
    bg-[var(--color-canvas-soft)]
    text-[var(--color-ink)]
  `,
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, variant = "light", className = "", id }, ref) => {
    const hasPy = className.includes("py-");
    return (
      <section
        ref={ref}
        id={id}
        className={`
          w-full min-h-full flex flex-col justify-center
          ${hasPy ? "" : "py-8 md:py-12"}
          px-[var(--spacing-lg)] md:px-[var(--spacing-xl)]
          ${variantStyles[variant]}
          ${className}
        `}
      >
        <div className="max-w-[1100px] mx-auto w-full">{children}</div>
      </section>
    );
  }
);

Section.displayName = "Section";
