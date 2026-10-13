import type { InvitationContent } from "../../shared/types";
import { useCountdown } from "../useCountdown";

type CountdownSectionProps = {
  content: InvitationContent;
};

function CountdownSection({ content }: CountdownSectionProps) {
  const parts = useCountdown(content.eventDateIso);
  const cells = [
    { value: parts.days, label: "dani" },
    { value: parts.hours, label: "sati" },
    { value: parts.minutes, label: "min" },
    { value: parts.seconds, label: "sek" },
  ];

  return (
    <section className="sf-count" data-section="countdown" aria-label="Odbrojavanje">
      <div className="sf-count__row">
        {cells.map((cell) => (
          <p key={cell.label} className="sf-count__cell">
            <span className="sf-count__value">{String(cell.value).padStart(2, "0")}</span>
            <span className="sf-count__label">{cell.label}</span>
          </p>
        ))}
      </div>
    </section>
  );
}

export default CountdownSection;
