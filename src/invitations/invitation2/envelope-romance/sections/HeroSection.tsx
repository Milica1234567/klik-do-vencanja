import { motion, useReducedMotion } from "framer-motion";

import { invitationEase } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import couplePlaceholder from "../assets/couple-hero-placeholder.jpg";

type HeroSectionProps = {
  content: InvitationContent;
};

function HeroSection({ content }: HeroSectionProps) {
  const reduceMotion = useReducedMotion();
  const { couple, heroImage } = content;
  const joiner = couple.joiner ?? "&";
  const photoSrc = heroImage?.src ?? couplePlaceholder;
  const photoAlt =
    heroImage?.alt ?? `${couple.partnerOne} i ${couple.partnerTwo}`;

  return (
    <section className="inv2-er-hero" data-section="hero" aria-label="Naslovnica">
      <div className="inv2-er-hero__photo">
        <img src={photoSrc} alt={photoAlt} draggable={false} />
        <div className="inv2-er-hero__photo-veil" aria-hidden="true" />
      </div>

      <motion.div
        className="inv2-er-hero__reveal"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          ease: invitationEase,
          delay: 0.2,
        }}
      >
        <h1 className="inv2-er-hero__names">
          <span className="inv2-er-hero__name">{couple.partnerOne}</span>
          <span className="inv2-er-hero__joiner" aria-hidden="true">
            {joiner}
          </span>
          <span className="inv2-er-hero__name">{couple.partnerTwo}</span>
        </h1>
      </motion.div>
    </section>
  );
}

export default HeroSection;
