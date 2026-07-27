import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { invitationTransition, slideVariants } from "./motion";
import "./SlideIn.css";

type SlideInProps = {
  children: ReactNode;
  /** First block should be "right", then alternate "left", "right", … */
  from: "left" | "right";
  className?: string;
  delay?: number;
  amount?: number;
};

/**
 * Scroll-triggered horizontal entrance for invitation copy/media.
 * Always full-width so content stays visually centered after the slide.
 */
function SlideIn({
  children,
  from,
  className = "",
  delay = 0,
  amount = 0.28,
}: SlideInProps) {
  const reduceMotion = useReducedMotion();
  const classes = `invitation-slide-in ${className}`.trim();

  if (reduceMotion) {
    return <div className={classes}>{children}</div>;
  }

  return (
    <motion.div
      className={classes}
      variants={slideVariants(from)}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount, once: true, margin: "0px 0px -10% 0px" }}
      transition={{ ...invitationTransition, delay }}
    >
      {children}
    </motion.div>
  );
}

export default SlideIn;
