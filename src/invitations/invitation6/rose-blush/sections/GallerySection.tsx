import { motion, useReducedMotion } from "framer-motion";

import ScrollReveal from "../../shared/ScrollReveal";
import { invitationEase, revealFromRight, revealUp } from "../../shared/motion";
import { useIsDesktopInvitation } from "../../shared/useIsDesktopInvitation";
import type { InvitationContent } from "../../shared/types";
import { invitationBreakpoints } from "../../shared/viewport";
import CardOrnaments from "../components/CardOrnaments";
import { blushPhotos } from "../content";

type GallerySectionProps = {
  content: InvitationContent;
};

function GallerySection({ content }: GallerySectionProps) {
  const isDesktop = useIsDesktopInvitation(invitationBreakpoints.md);
  const reduceMotion = useReducedMotion();
  const quoteClassName = isDesktop
    ? "inv6-qb-card inv6-qb-card--quote"
    : "inv6-qb-card inv6-qb-card--quote inv6-qb-card--quote-mobile";
  const galleryClassName = isDesktop
    ? "inv6-qb-gallery"
    : "inv6-qb-gallery inv6-qb-gallery--mobile";
  const polaroidsClassName = isDesktop
    ? "inv6-qb-polaroids"
    : "inv6-qb-polaroids inv6-qb-polaroids--mobile";

  return (
    <ScrollReveal
      as="section"
      className="inv6-qb-section inv6-qb-section--gallery"
      variants={isDesktop ? revealFromRight : revealUp}
      amount={isDesktop ? 0.08 : 0.18}
      once
    >
      <div className={galleryClassName} data-section="gallery">
        <div className={polaroidsClassName}>
          {blushPhotos.map((src, index) => (
            <motion.figure
              key={src}
              className={`inv6-qb-polaroid inv6-qb-polaroid--${index + 1}`}
              initial={
                reduceMotion
                  ? false
                  : isDesktop
                    ? { opacity: 0, y: -86, scale: 1.08 }
                    : { opacity: 0, y: 28, scale: 0.96 }
              }
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: isDesktop ? 0.25 : 0.12 }}
              transition={
                isDesktop
                  ? {
                      type: "spring",
                      stiffness: 118,
                      damping: 13,
                      delay: 0.12 + index * 0.18,
                    }
                  : {
                      duration: 0.85,
                      delay: index * 0.12,
                      ease: invitationEase,
                    }
              }
            >
              <img src={src} alt="" draggable={false} loading="eager" />
            </motion.figure>
          ))}
        </div>

        <article className={quoteClassName}>
          <CardOrnaments set="quote" />
          <span className="inv6-qb-quote-mark" aria-hidden="true">
            “
          </span>
          <p className="inv6-qb-quote-text">{content.quote}</p>
          <span className="inv6-qb-quote-rule" aria-hidden="true" />
        </article>
      </div>
    </ScrollReveal>
  );
}

export default GallerySection;
