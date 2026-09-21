import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import type { PearlWhiteContent } from "../content";
import { useCountdown } from "../useCountdown";

type CountdownSectionProps = {
  content: PearlWhiteContent;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountdownSection({ content }: CountdownSectionProps) {
  const parts = useCountdown(content.eventDateIso);
  const cells = [
    { value: parts.days, label: "Dani" },
    { value: parts.hours, label: "Sati" },
    { value: parts.minutes, label: "Minuti" },
    { value: parts.seconds, label: "Sekunde" },
  ];

  return (
    <ScrollReveal as="section" className="bs-section" variants={revealFade}>
      <div className="bs-panel">
        <h2 className="bs-script">
          {content.countdownTitle ?? "Proslava počinje za"}
        </h2>
        <div className="bs-countdown__row" aria-live="polite">
          {cells.map((cell, index) => (
            <div key={cell.label} className="bs-countdown__cell">
              {index > 0 ? (
                <span className="bs-countdown__colon" aria-hidden="true">
                  :
                </span>
              ) : null}
              <div className="bs-countdown__stack">
                <span className="bs-countdown__value">
                  {parts.done ? "00" : pad(cell.value)}
                </span>
                <span className="bs-countdown__label">{cell.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default CountdownSection;
