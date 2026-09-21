import SlideIn from "../../shared/SlideIn";
import { PearlWinding } from "../decor";
import type { PearlEleganceContent } from "../content";
import { usePearlReveal } from "../reveal";

type ProgramSectionProps = {
  content: PearlEleganceContent;
};

/**
 * Program of the day: a vertical pearl chain threads through
 * the schedule entries.
 */
function ProgramSection({ content }: ProgramSectionProps) {
  const program = content.program;
  const revealed = usePearlReveal();
  if (!program) return null;

  return (
    <section
      className="inv4-pe-section inv4-pe-section--taupe inv4-pe-program"
      data-section="program"
      aria-label="Program dana"
    >
      <div className="inv4-pe-section__inner">
        <SlideIn from="right" className="inv4-pe-heading" active={revealed}>
          <h2 className="inv4-pe-title inv4-pe-title--light">{program.title}</h2>
          {program.script ? (
            <p className="inv4-pe-script inv4-pe-script--light">{program.script}</p>
          ) : null}
        </SlideIn>

        <div className="inv4-pe-program__body">
          <PearlWinding className="inv4-pe-program__winding" />
          <ol className="inv4-pe-program__list">
            {program.items.map((item, index) => (
              <li
                key={item.id}
                className={`inv4-pe-program__item inv4-pe-program__item--${
                  index % 2 === 0 ? "left" : "right"
                }`}
              >
                <SlideIn
                  from={index % 2 === 0 ? "left" : "right"}
                  delay={index * 0.08}
                  className="inv4-pe-program__slide"
                  active={revealed}
                >
                  <span className="inv4-pe-program__time">{item.time}</span>
                  <span className="inv4-pe-program__label">{item.label}</span>
                </SlideIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default ProgramSection;
