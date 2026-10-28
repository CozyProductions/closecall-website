"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntroDone } from "@/lib/intro";

const EASE = [0.76, 0, 0.24, 1] as const;

// A few letters per word overshoot and settle late, like a misaligned print run.
const isStray = (word: number, i: number) => (word * 7 + i * 5) % 6 === 1;

// Lines stay together on wide screens; on narrow ones they wrap between words, never inside one.
export default function SplitHero({
  lines,
  className = "",
  as: Tag = "h1",
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2";
}) {
  const ready = useIntroDone();
  const reduce = useReducedMotion();

  let n = 0;
  let w = 0;
  return (
    <Tag aria-label={lines.join(" ")} className={className}>
      {lines.map((line) => (
        <span key={line} aria-hidden className="block md:whitespace-nowrap">
          {line.split(" ").map((word, wi) => {
            const wordIndex = w++;
            return (
              <span key={wi}>
                {wi > 0 && " "}
                <span className="split-word inline-block whitespace-nowrap">
                  {[...word].map((char, i) => {
                    const delay = 0.04 * n++;
                    const stray = isStray(wordIndex, i);
                    return (
                      <motion.span
                        key={i}
                        className="inline-block will-change-transform"
                        initial={reduce ? false : { y: "105%" }}
                        animate={ready || reduce ? { y: stray ? ["105%", "-22%", "-22%", "0%"] : "0%" } : undefined}
                        transition={
                          stray
                            ? { duration: 1.5, delay, times: [0, 0.35, 0.75, 1], ease: EASE }
                            : { duration: 0.9, delay, ease: EASE }
                        }
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
