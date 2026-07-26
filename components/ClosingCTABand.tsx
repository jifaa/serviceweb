"use client";

import { Button } from "./ui/Button";

export function ClosingCTABand() {
  return (
    <section className="bg-[var(--color-surface-teal-deep)] py-24 px-[var(--spacing-lg)] md:px-[var(--spacing-xl)]">
      <div className="max-w-[1100px] mx-auto text-center">
        {/* Headline */}
        <h2 className="text-display-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 540 text-[var(--color-on-primary)] mb-6">
          Siap Mewujudkan Website Impian Anda?
        </h2>

        {/* Subtext */}
        <p className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-on-dark-mute)] max-w-xl mx-auto mb-8">
          Mari diskusikan project Anda. Saya akan dengan senang hati membantu mengubah ide menjadi kenyataan.
        </p>

        {/* CTA */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            variant="on-teal"
            size="lg"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Mulai Diskusi
          </Button>
          <Button
            variant="secondary-outline"
            size="lg"
            className="!border-[var(--color-on-dark-faint)] !text-[var(--color-on-primary)] hover:!bg-[var(--color-on-primary)]/10"
            onClick={() => {
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Lihat Portfolio
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--color-surface-teal-mid)] rounded-full opacity-30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[var(--color-surface-teal-mid)] rounded-full opacity-20 blur-3xl" />
      </div>
    </section>
  );
}
