import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import callaImage from "../assets/calla-gate.png";

const LIFT = 1.15;

type FlowerGateOpenerProps = {
  partnerOne: string;
  partnerTwo: string;
  joiner?: string;
  onOpen: () => void;
  onComplete: () => void;
  leaving: boolean;
};

function FlowerGateOpener({
  partnerOne,
  partnerTwo,
  onOpen,
  onComplete,
  leaving,
}: FlowerGateOpenerProps) {
  const reduceMotion = useReducedMotion();
  const finishedRef = useRef(false);
  const initial = (name: string) => name.trim().charAt(0).toLocaleUpperCase("sr-Latn");
  const finish = () => {
    if (!leaving || finishedRef.current) return;
    finishedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!leaving) return;
    const ms = reduceMotion ? 180 : Math.round(LIFT * 1000) + 80;
    const id = window.setTimeout(finish, ms);
    return () => window.clearTimeout(id);
  }, [leaving, reduceMotion]);

  return (
    <button
      type="button"
      className="inv5-sf-gate"
      onClick={() => {
        if (!leaving) onOpen();
      }}
      aria-label="Otvorite pozivnicu"
    >
      <motion.span
        className="inv5-sf-gate__veil"
        initial={false}
        animate={
          leaving
            ? { y: "-112%" }
            : reduceMotion
              ? { y: "0%" }
              : { y: ["0%", "-1.2%", "0.4%", "0%"] }
        }
        transition={
          leaving
            ? { duration: reduceMotion ? 0.2 : LIFT, ease: [0.7, 0, 0.2, 1] }
            : reduceMotion
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.35, 0.7, 1] }
        }
      >
        <img className="inv5-sf-gate__image" src={callaImage} alt="" draggable={false} />
        <span className="inv5-sf-gate__seal">
          <span className="inv5-sf-gate__mark" aria-hidden="true">
            <span>{initial(partnerOne)}</span>
            <span className="inv5-sf-gate__mark-bar" />
            <span>{initial(partnerTwo)}</span>
          </span>
          <span className="inv5-sf-gate__hint">Otvorite</span>
        </span>
      </motion.span>
    </button>
  );
}

export default FlowerGateOpener;
