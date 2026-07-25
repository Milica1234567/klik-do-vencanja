import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import "./SectionHandoff.css";

/**
 * Rhionn-style dissolve between stacked full-bleed sections:
 * soft cream veil that crossfades while the previous section exits
 * and the next one rises into view.
 */
function SectionHandoff() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const veilOpacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    reduceMotion ? [0.5, 0.5, 0.5, 0.5] : [0.15, 0.85, 0.85, 0.2],
  );

  const veilY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [24, -24],
  );

  return (
    <div ref={ref} className="section-handoff" aria-hidden="true">
      <motion.div
        className="section-handoff__veil"
        style={{ opacity: veilOpacity, y: veilY }}
      />
      <div className="section-handoff__mist section-handoff__mist--top" />
      <div className="section-handoff__mist section-handoff__mist--bottom" />
    </div>
  );
}

export default SectionHandoff;
