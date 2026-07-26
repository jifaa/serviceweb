"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary-dark" | "primary-dark-pressed" | "on-dark-pill" | "secondary-outline" | "on-teal";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  "primary-dark": `
    bg-[var(--color-primary)] text-[var(--color-on-primary)]
    hover:bg-[var(--color-primary-deep)]
  `,
  "primary-dark-pressed": `
    bg-[var(--color-primary-deep)] text-[var(--color-on-primary)]
  `,
  "on-dark-pill": `
    bg-[var(--color-surface-violet-soft)] text-[var(--color-primary)]
  `,
  "secondary-outline": `
    bg-[var(--color-canvas)] text-[var(--color-ink)] border border-[var(--color-hairline-dark)]
    hover:bg-[var(--color-canvas-soft)]
  `,
  "on-teal": `
    bg-[var(--color-canvas)] text-[var(--color-surface-teal-deep)]
    hover:bg-[var(--color-canvas-soft)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-5 py-3",
  lg: "px-6 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary-dark",
      size = "md",
      disabled,
      isLoading,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          cursor-target inline-flex items-center justify-center gap-2
          font-[var(--font-inter)] text-button-md
          rounded-[var(--radius-md)]
          transition-all duration-200 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonVariant, ButtonSize };
