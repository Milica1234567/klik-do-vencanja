import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { invitationEase } from "../../shared/motion";
import floral2 from "../assets/floral-2.png";
import floral3 from "../assets/floral-3.png";
import waxSeal from "../assets/wax-seal.png";

const HOLD_AFTER = 2.4;
const EXIT_DURATION = 1;

type SealRevealOpenerProps = {
  partnerOne: string;
  partnerTwo: string;
  joiner?: string;
  monogram?: string;
  eventDateLabel: string;
  onComplete: () => void;
};

function SealRevealOpener({
  partnerOne,
  partnerTwo,
  joiner = "i",
  monogram = "V&P",
  eventDateLabel,
  onComplete,
}: SealRevealOpenerProps) {
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      onComplete();
      return;
    }
    const id = window.setTimeout(() => setLeaving(true), (4.2 + HOLD_AFTER) * 1000);
    return () => window.clearTimeout(id);
  }, [onComplete, reduceMotion]);

  return (
    <motion.button
      type="button"
      className="bs-intro"
      onClick={() => setLeaving(true)}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{
        duration: leaving ? EXIT_DURATION : 0.45,
        ease: invitationEase,
      }}
      onAnimationComplete={() => {
        if (leaving) onComplete();
      }}
      aria-label="Otvorite pozivnicu"
    >
      <div className="bs-intro__wash" aria-hidden="true" />

      <motion.img
        className="bs-intro__floral bs-intro__floral--top"
        src={floral2}
        alt=""
        draggable={false}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: leaving ? 0 : 0.92, y: 0 }}
        transition={{ duration: 1.2, delay: 0.15, ease: invitationEase }}
      />

      <div className="bs-intro__center">
        <motion.div
          className="bs-intro__seal-wrap"
          initial={{ opacity: 0, scale: 0.72 }}
          animate={
            leaving
              ? { opacity: 0, scale: 1.08 }
              : { opacity: 1, scale: 1 }
          }
          transition={{ duration: 1.1, delay: leaving ? 0 : 0.35, ease: invitationEase }}
        >
          <img className="bs-intro__seal" src={waxSeal} alt="" draggable={false} />
          <span className="bs-intro__monogram">{monogram}</span>
        </motion.div>

        <motion.p
          className="bs-intro__label"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: leaving ? 0 : 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15, ease: invitationEase }}
        >
          Dan venčanja
        </motion.p>

        <motion.p
          className="bs-intro__date"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: leaving ? 0 : 1, y: 0 }}
          transition={{ duration: 0.85, delay: 1.55, ease: invitationEase }}
        >
          {eventDateLabel}
        </motion.p>

        <motion.h1
          className="bs-intro__names"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: leaving ? 0 : 1, y: 0 }}
          transition={{ duration: 1, delay: 2.05, ease: invitationEase }}
        >
          <span>{partnerOne}</span>
          <span className="bs-intro__joiner">{joiner}</span>
          <span>{partnerTwo}</span>
        </motion.h1>

        <motion.span
          className="bs-intro__hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: leaving ? 0 : 0.7 }}
          transition={{ duration: 0.8, delay: 3.1, ease: invitationEase }}
        >
          dodirnite da otvorite
        </motion.span>
      </div>

      <motion.img
        className="bs-intro__floral bs-intro__floral--bottom"
        src={floral3}
        alt=""
        draggable={false}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: leaving ? 0 : 0.95, y: 0 }}
        transition={{ duration: 1.2, delay: 0.25, ease: invitationEase }}
      />
    </motion.button>
  );
}

export default SealRevealOpener;
