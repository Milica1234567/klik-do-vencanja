import ScrollReveal from "../../shared/ScrollReveal";
import { revealScale } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { blushArt } from "../art";
import CardOrnaments from "../components/CardOrnaments";
import LineArt from "../components/LineArt";
import { roseBlushDateParts } from "../content";

type HeroSectionProps = {
  content: InvitationContent;
};

function HeroSection({ content }: HeroSectionProps) {
  const { couple } = content;
  const joiner = couple.joiner ?? "i";
  const date = roseBlushDateParts;

  return (
    <ScrollReveal
      as="section"
      className="inv6-qb-section"
      variants={revealScale}
      amount={0.08}
      once
    >
      <div className="inv6-qb-hero" data-section="hero">
        <article className="inv6-qb-card inv6-qb-card--hero">
          <CardOrnaments set="hero" />
          <LineArt src={blushArt.bow} className="inv6-qb-bow" />
          <p className="inv6-qb-arch">{content.announcement}</p>
          <span className="inv6-qb-heart-rule" aria-hidden="true">
            ♡
          </span>
          <h1 className="inv6-qb-names">
            <span className="inv6-qb-script inv6-qb-script--hero">{couple.partnerOne}</span>
            <span className="inv6-qb-names__joiner">{joiner}</span>
            <span className="inv6-qb-script inv6-qb-script--hero inv6-qb-script--alt">
              {couple.partnerTwo}
            </span>
          </h1>
          <p className="inv6-qb-invite-line">Pozivamo vas da proslavite naš dan</p>
          <div className="inv6-qb-date">
            <span className="inv6-qb-date__weekday">{date.weekday}</span>
            <span className="inv6-qb-date__day">{date.day}</span>
            <span className="inv6-qb-date__month">
              {date.month} {date.year}
            </span>
          </div>
          <LineArt src={blushArt.rings} className="inv6-qb-tiara" />
        </article>
      </div>
    </ScrollReveal>
  );
}

export default HeroSection;
