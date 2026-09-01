import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import type { InvitationContent } from "../../shared/types";
import { useCountdown } from "../useCountdown";

type CountdownSectionProps = {
  content: InvitationContent;
};

function CountdownSection({ content }: CountdownSectionProps) {
  const { days, hours, minutes, seconds, done } = useCountdown(
    content.eventDateIso,
  );

  const units = [
    { label: "dana", value: days },
    { label: "sati", value: hours },
    { label: "minuta", value: minutes },
    { label: "sekundi", value: seconds },
  ];

  return (
    <ScrollReveal as="section" className="inv6-qb-section" variants={revealFade} amount={0.08} once>
      <div className="inv6-qb-countdown" data-section="countdown">
        <h2 className="inv6-qb-script inv6-qb-script--mid">Ostalo je</h2>
        {done ? (
          <p className="inv6-qb-countdown__done">Danas je taj dan!</p>
        ) : (
          <div className="inv6-qb-countdown__grid" aria-live="polite">
            {units.map((unit) => (
              <div key={unit.label} className="inv6-qb-countdown__cell">
                <span className="inv6-qb-countdown__value">
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="inv6-qb-countdown__label">{unit.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

export default CountdownSection;
