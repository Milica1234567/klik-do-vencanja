import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import type { InvitationContent } from "../../shared/types";
import couplePlaceholder from "../assets/couple-hero-placeholder.jpg";

type HeroSectionProps = {
  content: InvitationContent;
};

function HeroSection({ content }: HeroSectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { couple, heroImage } = content;
  const joiner = couple.joiner ?? "&";
  const photoSrc = heroImage?.src ?? couplePlaceholder;
  const photoAlt = heroImage?.alt ?? `${couple.partnerOne} i ${couple.partnerTwo}`;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.025, 1]);

  return (
    <section className="inv2-er-hero" data-section="hero" aria-label="Naslovnica" ref={ref}>
      <div className="inv2-er-hero__photo">
        <motion.img
          src={photoSrc}
          alt={photoAlt}
          draggable={false}
          style={{ scale: photoScale }}
        />
        <div className="inv2-er-hero__photo-veil" aria-hidden="true" />
      </div>

      <div className="inv2-er-hero__reveal">
        <h1 className="inv2-er-hero__names">
          <span className="inv2-er-hero__name">{couple.partnerOne}</span>
          <span className="inv2-er-hero__joiner" aria-hidden="true">
            {joiner}
          </span>
          <span className="inv2-er-hero__name">{couple.partnerTwo}</span>
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;
