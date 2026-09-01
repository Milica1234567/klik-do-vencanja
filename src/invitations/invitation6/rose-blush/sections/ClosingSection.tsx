import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { blushArt } from "../art";
import LineArt from "../components/LineArt";

type ClosingSectionProps = {
  content: InvitationContent;
};

function ClosingSection({ content }: ClosingSectionProps) {
  return (
    <ScrollReveal
      as="section"
      className="inv6-qb-section inv6-qb-section--closing"
      variants={revealFade}
      amount={0.08}
      once
    >
      <div className="inv6-qb-closing" data-section="closing">
        <span className="inv6-qb-closing__15" aria-hidden="true">
          {content.monogram ?? "JS"}
        </span>
        <p className="inv6-qb-script inv6-qb-script--hero inv6-qb-closing__name">
          <span className="inv6-qb-script--hero">{content.couple.partnerOne}</span>
          <span className="inv6-qb-names__joiner"> {content.couple.joiner ?? "i"} </span>
          <span className="inv6-qb-script--alt">{content.couple.partnerTwo}</span>
        </p>
        <LineArt src={blushArt.envelope} className="inv6-qb-closing__envelope" />
      </div>
    </ScrollReveal>
  );
}

export default ClosingSection;
