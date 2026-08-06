"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "neu" | "neu-accent" | "neu-inset" | "neu-outline";
type ButtonSize = "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  /** Enable 3D press effect on click (default: true) */
  press3d?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  "neu": `
    neu neu-press
    bg-[var(--neu-bg)] text-[var(--neu-foreground)]
    hover:text-[var(--neu-accent)]
  `,
  "neu-accent": `
    neu neu-press
    bg-[var(--neu-accent)] text-white
  `,
  "neu-inset": `
    neu-inset
    bg-[var(--neu-bg)] text-[var(--neu-foreground)]
  `,
  "neu-outline": `
    bg-transparent
    text-[var(--neu-foreground)]
    border-2 border-[var(--neu-foreground-muted)]
    hover:border-[var(--neu-accent)] hover:text-[var(--neu-accent)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "neu",
      size = "md",
      disabled,
      isLoading,
      press3d = true,
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
          font-medium rounded-[var(--radius-lg)]
          transition-all duration-200 ease-out
          disabled:opacity-50 disabled:cursor-not-allowed
          ${press3d && variant !== "neu-inset" ? "neu-press" : ""}
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
