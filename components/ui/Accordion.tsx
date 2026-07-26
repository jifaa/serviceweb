"use client";

import { useState } from "react";

interface AccordionItemProps {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[var(--color-hairline)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-[var(--spacing-xl)] flex items-center justify-between gap-4 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-body-lg font-[family-name:var(--font-inter)] font-variation-settings:'wght' 460 text-[var(--color-ink)]">
          {question}
        </span>
        <svg
          className={`
            w-5 h-5 flex-shrink-0 text-[var(--color-ink-mute)]
            transition-transform duration-300 ease-out
            ${isOpen ? "rotate-180" : ""}
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-out
          ${isOpen ? "max-h-[500px] opacity-100 pb-[var(--spacing-xl)]" : "max-h-0 opacity-0"}
        `}
      >
        <p className="text-body-md text-[var(--color-ink-mute)]">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="divide-y divide-[var(--color-hairline)]">
      {items.map((item, index) => (
        <AccordionItem key={index} question={item.question} answer={item.answer} />
      ))}
    </div>
  );
}
