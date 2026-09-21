import { motion, useReducedMotion } from "framer-motion";

import ScrollReveal from "../../shared/ScrollReveal";
import { invitationEase, revealFade } from "../../shared/motion";
import floral1 from "../assets/floral-1.png";
import floral2 from "../assets/floral-2.png";
import floral3 from "../assets/floral-3.png";
import type { PearlWhiteContent } from "../content";

type HeroSectionProps = {
  content: PearlWhiteContent;
};

function HeroSection({ content }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const { couple, eventDateLabel, announcement } = content;
  const joiner = couple.joiner ?? "i";

  return (
    <ScrollReveal as="section" className="bs-hero" variants={revealFade} amount={0.2}>
      <div className="bs-hero__copy">
        <p className="bs-hero__eyebrow">{announcement ?? "Dan venčanja"}</p>
        <p className="bs-hero__date">{eventDateLabel}</p>
        <h1 className="bs-hero__names">
          <span>{couple.partnerOne}</span>
          <span className="bs-hero__joiner">{joiner}</span>
          <span>{couple.partnerTwo}</span>
        </h1>
      </div>

      <motion.img
        className="bs-hero__floral bs-hero__floral--left"
        src={floral2}
        alt=""
        draggable={false}
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: invitationEase }}
      />
      <motion.img
        className="bs-hero__floral bs-hero__floral--center"
        src={floral1}
        alt=""
        draggable={false}
        initial={reduceMotion ? false : { opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 1.05, ease: invitationEase }}
      />
      <motion.img
        className="bs-hero__floral bs-hero__floral--right"
        src={floral3}
        alt=""
        draggable={false}
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 1, ease: invitationEase }}
      />
    </ScrollReveal>
  );
}

export default HeroSection;
