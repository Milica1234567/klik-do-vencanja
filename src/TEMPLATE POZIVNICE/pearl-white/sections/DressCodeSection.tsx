import ScrollReveal from "../../shared/ScrollReveal";
import { revealFade } from "../../shared/motion";
import type { PearlWhiteContent } from "../content";

type DressCodeSectionProps = {
  content: PearlWhiteContent;
};

function DressCodeSection({ content }: DressCodeSectionProps) {
  const dress = content.dressCode;
  if (!dress) return null;
  const swatches = content.dressSwatches ?? [];

  return (
    <ScrollReveal as="section" className="bs-section" variants={revealFade}>
      <div className="bs-panel">
        <h2 className="bs-script">{dress.title}</h2>
        {dress.note ? <p className="bs-body">{dress.note}</p> : null}
        {swatches.length ? (
          <ul className="bs-dress__swatches" aria-label="Predložena paleta">
            {swatches.map((color) => (
              <li
                key={color}
                className="bs-dress__swatch"
                style={{ backgroundColor: color }}
              />
            ))}
          </ul>
        ) : null}
        {content.dressGentlemenNote ? (
          <p className="bs-dress__note">{content.dressGentlemenNote}</p>
        ) : null}
      </div>
    </ScrollReveal>
  );
}

export default DressCodeSection;
