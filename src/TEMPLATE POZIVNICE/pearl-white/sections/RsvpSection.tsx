import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import type { PearlWhiteContent } from "../content";

type RsvpSectionProps = {
  content: PearlWhiteContent;
};

function RsvpSection({ content }: RsvpSectionProps) {
  const rsvp = content.rsvp;
  if (!rsvp) return null;

  return (
    <ScrollReveal as="section" className="bs-section bs-rsvp" variants={revealFade}>
      <div className="bs-panel bs-panel--soft">
        <h2 className="bs-script">{rsvp.title}</h2>
        {rsvp.deadlineLabel ? (
          <p className="bs-body">{rsvp.deadlineLabel}</p>
        ) : null}
        <a
          className="bs-rsvp__cta"
          href={rsvp.href ?? "#rsvp"}
          onClick={(event) => {
            if (!rsvp.href) event.preventDefault();
          }}
        >
          {rsvp.ctaLabel}
        </a>
      </div>
    </ScrollReveal>
  );
}

export default RsvpSection;
