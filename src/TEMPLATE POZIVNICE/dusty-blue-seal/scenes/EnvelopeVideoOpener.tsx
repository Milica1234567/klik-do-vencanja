import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { invitationEase } from "../../shared/motion";
import openerBg from "../assets/opener-bg.png";

const EXIT_FADE_SEC = 1.05;

type EnvelopeVideoOpenerProps = {
  onComplete: () => void;
};

function EnvelopeVideoOpener({ onComplete }: EnvelopeVideoOpenerProps) {
  const reduceMotion = useReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) onComplete();
  }, [onComplete, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <motion.button
      type="button"
      className="dbs-video-opener"
      onClick={() => setLeaving(true)}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: EXIT_FADE_SEC, ease: invitationEase }}
      onAnimationComplete={() => {
        if (leaving) onComplete();
      }}
      aria-label="Otvorite pozivnicu"
    >
      <img
        className="dbs-video-opener__backdrop"
        src={openerBg}
        alt=""
        draggable={false}
        aria-hidden="true"
      />
      <span className="dbs-video-opener__hint">Dodirnite da otvorite</span>
    </motion.button>
  );
}

export default EnvelopeVideoOpener;
