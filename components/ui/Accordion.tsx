"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

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
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-5 h-5 flex-shrink-0 text-[var(--color-ink-mute)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
            }}
            className="overflow-hidden pb-[var(--spacing-xl)]"
          >
            <p className="text-body-md text-[var(--color-ink-mute)]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
