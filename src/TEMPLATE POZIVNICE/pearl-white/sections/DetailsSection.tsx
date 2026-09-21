import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import floral3 from "../assets/floral-3.png";
import type { PearlWhiteContent } from "../content";

type DetailsSectionProps = {
  content: PearlWhiteContent;
};

function DetailsSection({ content }: DetailsSectionProps) {
  const details = content.details;
  if (!details) return null;

  return (
    <ScrollReveal as="section" className="bs-section bs-details" variants={revealFade}>
      <div className="bs-panel">
        <h2 className="bs-script">{details.title}</h2>
        <p className="bs-body">{details.intro}</p>
        <p className="bs-details__contact">
          <span>{details.contactName}</span>
          <a href={`tel:${details.contactPhone.replace(/\s/g, "")}`}>
            {details.contactPhone}
          </a>
        </p>
        {content.gifts?.body ? (
          <p className="bs-body bs-details__gifts">{content.gifts.body}</p>
        ) : null}
      </div>
      <img
        className="bs-float-floral bs-float-floral--details"
        src={floral3}
        alt=""
        draggable={false}
      />
    </ScrollReveal>
  );
}

export default DetailsSection;
