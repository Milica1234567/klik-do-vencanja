import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { blushArt } from "../art";
import CardOrnaments from "../components/CardOrnaments";
import LineArt from "../components/LineArt";

type DressCodeSectionProps = {
  content: InvitationContent;
};

function DressCodeSection({ content }: DressCodeSectionProps) {
  const { dressCode } = content;
  if (!dressCode) return null;

  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealFade} amount={0.08} once>
      <article className="inv6-qb-card inv6-qb-card--detail" data-section="dress-code">
        <CardOrnaments set="dress" />
        <LineArt src={blushArt.couple} className="inv6-qb-detail-icon inv6-qb-detail-icon--couple" />
        <p className="inv6-qb-caps">{dressCode.title}</p>
        <p className="inv6-qb-script inv6-qb-script--card">{dressCode.label}</p>
      </article>
    </ScrollReveal>
  );
}

export default DressCodeSection;
