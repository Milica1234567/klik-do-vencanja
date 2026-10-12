import type { InvitationContent } from "../../shared/types";
import laceFrame from "../assets/lace-frame.png";

type HeroSectionProps = {
  content: InvitationContent;
  writeNames?: boolean;
};

function HeroSection({ content }: HeroSectionProps) {
  const { couple } = content;
  const joiner = couple.joiner ?? "i";
  const initial = (name: string) => name.trim().charAt(0).toLocaleUpperCase("sr-Latn");

  return (
    <section className="inv5-sf-hero" data-section="hero" aria-label="Naslovnica">
      <div className="inv5-sf-hero__lockup">
        <img className="inv5-sf-hero__lace" src={laceFrame} alt="" draggable={false} />
        <p className="inv5-sf-hero__mark" aria-hidden="true">
          <span>{initial(couple.partnerOne)}</span>
          <span className="inv5-sf-hero__mark-bar" />
          <span>{initial(couple.partnerTwo)}</span>
        </p>

        <h1 className="inv5-sf-hero__names">
          <span>{couple.partnerOne}</span>
          <span className="inv5-sf-hero__script">{joiner}</span>
          <span>{couple.partnerTwo}</span>
        </h1>
      </div>
    </section>
  );
}

export default HeroSection;
