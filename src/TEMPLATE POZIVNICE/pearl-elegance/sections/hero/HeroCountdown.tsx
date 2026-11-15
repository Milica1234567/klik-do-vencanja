import { motion, useReducedMotion } from "framer-motion";

import type { CountdownParts } from "./useHeroCountdown";

type HeroCountdownProps = {
  parts: CountdownParts;
  arrived: boolean;
  arrivedNote?: string;
  active: boolean;
};

const LABELS = ["dana", "sati", "min", "sek"] as const;

function HeroCountdown({
  parts,
  arrived,
  arrivedNote = "Danas je taj dan!",
  active,
}: HeroCountdownProps) {
  const reduceMotion = useReducedMotion();
  const values = [parts.days, parts.hours, parts.minutes, parts.seconds];

  if (arrived) {
    return (
      <p className="pe-hero__cd-arrived" aria-live="polite">
        {arrivedNote}
      </p>
    );
  }

  return (
    <motion.div
      className="pe-hero__cd"
      aria-live="polite"
      aria-label="Odbrojavanje do venčanja"
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0.2 : 0.9, ease: "easeOut" }}
    >
      <div className="pe-hero__cd-grid">
        {values.map((value, index) => (
          <div key={LABELS[index]} className="pe-hero__cd-col">
            <div className="pe-hero__cd-value-wrap">
              <span className="pe-hero__cd-value">{String(value).padStart(2, "0")}</span>
            </div>
            <span className="pe-hero__cd-label">{LABELS[index]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroCountdown;
