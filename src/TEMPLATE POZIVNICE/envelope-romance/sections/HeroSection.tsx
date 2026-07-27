import { motion } from "framer-motion";

import { invitationEase } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import couplePlaceholder from "../assets/couple-hero-placeholder.png";

type HeroSectionProps = {
  content: InvitationContent;
};

/**
 * Temporary hero while Canva envelope layers are prepared.
 * Opener scene will use separate assets (body, flap, seal, paper)
 * via config + Framer Motion — not a single baked PNG/video.
 */
function HeroSection({ content }: HeroSectionProps) {
  const { couple, eventDateLabel, heroImage } = content;
  const joiner = couple.joiner ?? "&";
  const photoSrc = heroImage?.src ?? couplePlaceholder;
  const photoAlt =
    heroImage?.alt ?? `${couple.partnerOne} i ${couple.partnerTwo}`;

  return (
    <section className="er-hero" data-section="hero" aria-label="Naslovnica">
      <div className="er-hero__photo">
        <img src={photoSrc} alt={photoAlt} draggable={false} />
        <div className="er-hero__photo-veil" aria-hidden="true" />
      </div>

      <motion.div
        className="er-hero__reveal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: invitationEase, delay: 0.15 }}
      >
        <p className="er-hero__eyebrow">sa radošću vas pozivamo</p>
        <h1 className="er-hero__names">
          <span className="er-hero__name">{couple.partnerOne}</span>
          <span className="er-hero__joiner" aria-hidden="true">
            {joiner}
          </span>
          <span className="er-hero__name">{couple.partnerTwo}</span>
        </h1>
        <div className="er-hero__rule" aria-hidden="true" />
        <p className="er-hero__date">{eventDateLabel}</p>
      </motion.div>

      <motion.div
        className="er-hero__scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.35 }}
      >
        <span className="er-hero__scroll-label">otkrijte priču</span>
        <motion.span
          className="er-hero__scroll-chevron"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

export default HeroSection;
