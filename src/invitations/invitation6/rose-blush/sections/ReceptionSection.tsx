import { motion } from "framer-motion";

import ScrollReveal from "../../shared/ScrollReveal";
import { invitationEase, revealFade } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { blushArt } from "../art";
import CardOrnaments from "../components/CardOrnaments";
import LineArt from "../components/LineArt";

type ReceptionSectionProps = {
  content: InvitationContent;
};

function ReceptionSection({ content }: ReceptionSectionProps) {
  const { venue } = content;
  if (!venue) return null;

  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealFade} amount={0.08} once>
      <h2 className="inv6-qb-gold-title">Detalji</h2>
      <article className="inv6-qb-card inv6-qb-card--detail" data-section="reception">
        <CardOrnaments set="reception" />
        <h3 className="inv6-qb-script inv6-qb-script--card">{venue.title}</h3>
        <LineArt src={blushArt.cocktails} className="inv6-qb-detail-icon inv6-qb-detail-icon--lg" />
        <p className="inv6-qb-detail-time">{venue.timeLabel}</p>
        <p className="inv6-qb-detail-place">{venue.placeName}</p>
        {venue.mapUrl ? (
          <motion.a
            className="inv6-qb-btn"
            href={venue.mapUrl}
            target="_blank"
            rel="noreferrer"
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: invitationEase }}
          >
            {venue.mapCtaLabel ?? "Pogledaj lokaciju"}
          </motion.a>
        ) : null}
      </article>
    </ScrollReveal>
  );
}

export default ReceptionSection;
